import { List, ListItem, Typography } from "@/components/TailwindComponents";
import CollabsScore from "./CollabsScore";
import ItemScoreFetcher from "./ItemScoreFetcher";
import LoadingSpinner from "../LoadingSpinner";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import ItemScore from "./ItemScore";
// async function getScore({ songID, albumID }) {
//   const supabase = createClient();
//   const { data, error } = await supabase.rpc("get_album_song_score", {
//     album_id: albumID,
//     spotify_id: songID,
//   });
//   return data[0];
// }

export default function ListScoreAlbumBody({ album }) {
  // const data = await getAlbumSongs(album.id);
  // if (data?.message) {
  //   return "An error occurred";
  // }
  // const data = await Promise.all(
  //   album.tracks.items.map(async (item) => {
  //     return await getScore({ songID: item.id, albumID: album.album_id });
  //   })
  // );
  // console.log(data);
  let songScoreDict = {};
  album.user_song_scores.forEach((score) => {
    songScoreDict[score.song_id] = score.score;
  });
  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {album.tracks.items.map((item, i) => {
        return (
          <ListItem
            className="p-1.5 flex justify-between hover:bg-alt-bg focus:bg-alt-bg active:bg-alt-bg hover:text-text focus:text-text active:text-text"
            key={i}
            ripple={false}
          >
            <Typography>{item.name}</Typography>
            <ItemScore
              albumID={album.album_id}
              songID={item.id}
              albumSong={true}
              defaultScore={songScoreDict[item.id]}
            />
            {/* <Suspense fallback={<LoadingSpinner />}>
              <CollabsScore albumID={album.album_id} songID={item.id} />
            </Suspense> */}
            {/* <Suspense fallback={<LoadingSpinner />}>
              <ItemScoreFetcher albumID={album.album_id} songID={item.id} />
            </Suspense> */}
            {/* <ItemScore albumID={album.album_id} songID={item.id} /> */}
          </ListItem>
        );
      })}
    </List>
  );
}
