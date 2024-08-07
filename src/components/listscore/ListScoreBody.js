import { Suspense } from "react";
import { List } from "@/components/TailwindComponents";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import ListScoreAlbum from "./ListScoreAlbum";
import ListScoreSong from "./ListScoreSong";
import SpotifySearchItemSkeleton from "../SpotifySearchItemSkeleton";
export default function ListScoreBody({ songs, albums }) {
  return (
    <div className="flex flex-col gap-5">
      <AlbumAccordion
        header={"Albums"}
        body={
          <div>
            {albums.map((album) => {
              return (
                <Suspense fallback={<SpotifySearchItemSkeleton />}>
                  <ListScoreAlbum key={album.album_id} album={album} />{" "}
                </Suspense>
              );
            })}
          </div>
        }
      />
      <AlbumAccordion
        header={"Songs"}
        body={
          <div>
            {
              <List className="bg-alt-bg-darker ">
                {songs.map((song) => {
                  return (
                    <Suspense fallback={<SpotifySearchItemSkeleton />}>
                      <ListScoreSong key={song.song_id} song={song} />
                    </Suspense>
                  );
                })}
              </List>
            }
          </div>
        }
      />
    </div>
  );
}
