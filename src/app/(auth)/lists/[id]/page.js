import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import TierListScoreHeader from "@/components/listscore/TierListScoreHeader";

import TierListScoreToDo from "@/components/listscore/TierListScoreToDo";
import TierListScoreInProgress from "@/components/listscore/TierListScoreInProgress";
import TierListScoreCompleted from "@/components/listscore/TierListScoreCompleted";

import getSpotifyToken from "@/tools/getSpotifyToken";

async function getListData(id) {
  const supabase = createClient();
  const { data: tierListData, error: tierListError } = await supabase
    .from("tierlists")
    .select("*, profiles!tierlists_creator_id_fkey(id, username, color)")
    .eq("id", id);
  const { data: collabsData, error: collabsError } = await supabase
    .from("listcollaborators")
    .select(
      "profiles(id, username, color, listalbumsongscore(album_id, spotify_id, score), listalbumscore(id, score), listsongscore(id, score))"
    )
    .eq("list_id", id);
  const { data: songsData, error: songsError } = await supabase
    .from("listsongs")
    .select()
    .eq("list_id", id);
  const { data: albumsData, error: albumsError } = await supabase
    .from("listalbums")
    .select()
    .eq("list_id", id);

  const { access_token } = await getSpotifyToken();

  const spotifyAlbums = { albums: [] };
  const spotifySongs = { tracks: [] };

  const listAlbums = albumsData.map((album) => album.spotify_id);
  const albumChunks = [];
  for (let i = 0; i < listAlbums.length; i += 20) {
    albumChunks.push(listAlbums.slice(i, i + 20));
  }

  for (const chunk of albumChunks) {
    const res = await fetch(
      `https://api.spotify.com/v1/albums?ids=${chunk.join(",")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const resJson = await res.json();

    spotifyAlbums.albums.push(...resJson.albums);
  }

  const listSongs = songsData.map((song) => song.spotify_id);
  const songChunks = [];
  for (let i = 0; i < listSongs.length; i += 50) {
    songChunks.push(listSongs.slice(i, i + 50));
  }

  for (const chunk of songChunks) {
    const res = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${chunk.join(",")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const resJson = await res.json();

    spotifySongs.tracks.push(...resJson.tracks);
  }

  // console.log(spotifyAlbums);

  return {
    list: tierListData[0],
    collaborators: collabsData,
    songs: songsData,
    albums: albumsData,
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
        <TierListScoreToDo id={id} />
        <TierListScoreInProgress />
        <TierListScoreCompleted />
      </div>
    </main>
  );
}
