import { List, ListItem, Typography } from "@/components/TailwindComponents";
import getSpotifyToken from "@/tools/getSpotifyToken";
import CollabsScore from "./CollabsScore";
import ItemScoreFetcher from "./ItemScoreFetcher";
import LoadingSpinner from "../LoadingSpinner";
import { Suspense } from "react";
async function getAlbumSongs(id) {
  try {
    const { access_token } = await getSpotifyToken();
    console.log(access_token);
    const res = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { message: "Error Fetching Songs" };
  }
}
export default async function ListScoreAlbumBody({ album }) {
  const data = await getAlbumSongs(album.id);
  if (data?.message) {
    return "An error occurred";
  }
  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {data?.items?.map((item, i) => {
        return (
          <ListItem
            className="p-1.5 flex justify-between hover:bg-alt-bg focus:bg-alt-bg active:bg-alt-bg hover:text-text focus:text-text active:text-text"
            key={i}
            ripple={false}
          >
            <Typography>{item.name}</Typography>
            <Suspense fallback={<LoadingSpinner />}>
              <CollabsScore albumID={album.album_id} songID={item.id} />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <ItemScoreFetcher albumID={album.album_id} songID={item.id} />
            </Suspense>
            {/* <ItemScore albumID={album.album_id} songID={item.id} /> */}
          </ListItem>
        );
      })}
    </List>
  );
}
