import { createClient } from "@/utils/supabase/server";

async function getListData(id) {
  const supabase = createClient();
  const { data: tierListData, error: tierListError } = await supabase
    .from("tierlists")
    .select()
    .eq("id", id);
  const { data: collabsData, error: collabsError } = await supabase
    .from("listcollaborators")
    .select()
    .eq("list_id", id);
  const { data: songsData, error: songsError } = await supabase
    .from("listsongs")
    .select()
    .eq("list_id", id);
  const { data: albumsData, error: albumsError } = await supabase
    .from("listalbums")
    .select()
    .eq("list_id", id);
  return {
    list: tierListData,
    collaborators: collabsData,
    songs: songsData,
    albums: albumsData,
  };
}

export default async function List({ params: { id } }) {
  const data = await getListData(id);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
