import AlbumAccordion from "../tierlists/AlbumAccordion";
import ListScoreBody from "./ListScoreBody";
import { createClient } from "@/utils/supabase/server";
async function getToDo(id) {
  const supabase = createClient();
  const { data: songsData, error: songsError } = await supabase.rpc(
    "get_songs_todo",
    {
      listid: id,
    }
  );
  const { data: albumsData, error: albumsError } = await supabase.rpc(
    "get_albums_todo",
    {
      listid: id,
    }
  );

  return {
    songs: songsData,
    albums: albumsData,
  };
}
export default async function TierListScoreToDo({ id }) {
  const todoData = await getToDo(id);
  return (
    <AlbumAccordion
      header={"To-Do"}
      body={<ListScoreBody songs={todoData?.songs} albums={todoData?.albums} />}
    />
  );
}
