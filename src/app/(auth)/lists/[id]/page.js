import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import TierListScoreHeader from "@/components/listscore/TierListScoreHeader";

import TierListScoreToDo from "@/components/listscore/TierListScoreToDo";
import TierListScoreInProgress from "@/components/listscore/TierListScoreInProgress";
import TierListScoreCompleted from "@/components/listscore/TierListScoreCompleted";

async function getListData(id) {
  const supabase = createClient();
  const { data: tierListData, error: tierListError } = await supabase
    .from("tierlists")
    .select("*, profiles!tierlists_creator_id_fkey(id, username, color)")
    .eq("id", id);
  const { data: collabsData, error: collabsError } = await supabase
    .from("listcollaborators")
    .select("profiles(id, username, color)")
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
      <Link
        href="/home"
        className="border px-2 py-1 rounded-full hover:underline"
      >
        Back to Home
      </Link>
      <TierListScoreHeader
        list={data.list}
        collaborators={data.collaborators}
      />
      <div className="bg-alt-bg p-3 rounded-md mt-10">
        <TierListScoreToDo />
        <TierListScoreInProgress />
        <TierListScoreCompleted />
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </main>
  );
}
