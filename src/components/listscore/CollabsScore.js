import { createClient } from "@/utils/supabase/server";
import { Tooltip, Button, Typography } from "@/components/TailwindComponents";
function CollabScoreView({ data }) {
  return (
    <div className="flex flex-col gap-2 min-w-48">
      {data.map((collab) => {
        return (
          <div className="flex items-center" key={collab.collaborator_id}>
            <div
              className="flex items-center justify-center bg-red-400 w-8 h-8 rounded-full"
              style={{ backgroundColor: `#${collab.color}` }}
            >
              {collab.username[0].toUpperCase()}
            </div>
            <Typography className="ml-1">{collab.username}</Typography>
            <Typography className="ml-auto">{collab.score ?? "N/A"}</Typography>
          </div>
        );
      })}
    </div>
  );
}
async function getCollabsScore(albumID, songID) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_list_album_scores_and_profiles",
    {
      album_id: albumID,
      song_id: songID,
    }
  );
  return data;
}
export default async function CollabsScore({ albumID, songID }) {
  const data = await getCollabsScore(albumID, songID);
  return (
    <Tooltip content={<CollabScoreView data={data} />}>
      <Button className="p-1.5 ml-auto mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          className="h-4 w-4"
        >
          <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
        </svg>
      </Button>
    </Tooltip>
  );
}
