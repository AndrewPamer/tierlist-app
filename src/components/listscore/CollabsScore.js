import { createClient } from "@/utils/supabase/server";
async function getCollabsScore(albumID, songID) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc(
    "get_list_album_scores_and_profiles",
    {
      album_id: albumID,
      song_id: songID,
    }
  );
  console.log(error);
  return data;
}
export default async function CollabsScore({ albumID, songID }) {
  const data = await getCollabsScore(albumID, songID);
  console.log(data);
}
