import { List } from "@/components/TailwindComponents";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import ListScoreAlbum from "./ListScoreAlbum";
import ListScoreSong from "./ListScoreSong";
export default function ListScoreBody({ songs, albums }) {
  return (
    <div className="flex flex-col gap-5">
      <AlbumAccordion
        header={"Albums"}
        body={
          <div>
            {albums.map((album) => {
              return <ListScoreAlbum key={album.album_id} album={album} />;
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
                  return <ListScoreSong key={song.song_id} song={song} />;
                })}
              </List>
            }
          </div>
        }
      />
    </div>
  );
}
