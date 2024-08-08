import { List, ListItem, Typography } from "@/components/TailwindComponents";
import getSpotifyToken from "@/tools/getSpotifyToken";
import ItemScore from "./ItemScore";
import CollabsScore from "./CollabsScore";
async function getAlbumSongs(id) {
  const { access_token } = await getSpotifyToken();
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
}
export default async function ListScoreAlbumBody({ album }) {
  const data = await getAlbumSongs(album.id);

  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {data?.items?.map((item, i) => {
        return (
          <ListItem className="p-1 flex justify-between" key={i} ripple={false}>
            <Typography>{item.name}</Typography>
            <CollabsScore albumID={album.album_id} songID={item.id} />
            <ItemScore albumID={album.album_id} songID={item.id} />
          </ListItem>
        );
      })}
    </List>
  );
}
