import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import TierListScoreHeader from "@/components/listscore/TierListScoreHeader";
import AlbumAccordion from "@/components/tierlists/AlbumAccordion";
import ListScoreAlbum from "@/components/listscore/ListScoreAlbum";
import ListScoreSong from "@/components/listscore/ListScoreSong";
import SpotifySearchItemSkeleton from "@/components/SpotifySearchItemSkeleton";
import LoadingSpinner from "@/components/LoadingSpinner";
import SpotifySearchItem from "@/components/tierlists/SpotifySearchItem";
async function getListData(id) {
  const supabase = createClient();

  const [
    { data: tierListData, error: tierListError },
    { data: collabsData, error: collabsError },
    { data: songsData, error: songsError },
    { data: albumsData, error: albumsError },
    { data: testD, error: testE },
  ] = await Promise.all([
    supabase
      .from("tierlists")
      .select("*, profiles!tierlists_creator_id_fkey(id, username, color)")
      .eq("id", id),
    supabase
      .from("listcollaborators")
      .select(
        "profiles(id, username, color, listalbumsongscore(album_id, spotify_id, score), listalbumscore(id, score), listsongscore(id, score))"
      )
      .eq("list_id", id),
    supabase.rpc("get_songs_and_scores", { query_list_id: id }),
    supabase.rpc("get_albums_and_score", { query_list_id: id }),
    // supabase.from("listalbums").select().eq("list_id", id),
    supabase.rpc("get_albums_and_score", { query_list_id: id }),
  ]);

  const albumChunks = [];
  for (let i = 0; i < albumsData.length; i += 20) {
    albumChunks.push(albumsData.slice(i, i + 20));
  }

  const songChunks = [];
  for (let i = 0; i < songsData.length; i += 50) {
    songChunks.push(songsData.slice(i, i + 50));
  }

  return {
    list: tierListData[0],
    collaborators: collabsData,
    songs: songChunks,
    albums: albumChunks,
  };
}

export default async function List({ params: { id } }) {
  const data = await getListData(id);
  return (
    <main>
      <Link href="/home" className=" px-2 py-1 hover:underline">
        Back to Home
      </Link>
      <TierListScoreHeader
        list={data.list}
        collaborators={data.collaborators}
      />
      <div className="bg-alt-bg p-3 rounded-md mt-10">
        {data.albums?.length !== 0 && (
          <AlbumAccordion
            header={"Albums"}
            body={data.albums.map((albums) => {
              return (
                <Suspense
                  fallback={
                    <div>
                      {albums.map((album) => (
                        <SpotifySearchItemSkeleton key={album.id} />
                      ))}
                    </div>
                  }
                >
                  <ListScoreAlbum albums={albums} />
                </Suspense>
              );
            })}
            // body={
            //   <Suspense fallback={"Loading..."}>
            //     <ListScoreAlbum albums={data.albums} />
            //   </Suspense>
            // }
          />
        )}
        {data.songs?.length !== 0 && (
          <AlbumAccordion
            header={"Songs"}
            body={data.songs.map((songs) => {
              return (
                <Suspense
                  fallback={
                    <div>
                      {songs.map((song) => (
                        <SpotifySearchItemSkeleton />
                      ))}
                    </div>
                  }
                >
                  <ListScoreSong songs={songs} />
                </Suspense>
              );
            })}
          />
        )}
      </div>
    </main>
  );
}
