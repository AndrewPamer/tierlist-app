import { ListItem } from "@/components/TailwindComponents";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import getSpotifyToken from "@/tools/getSpotifyToken";
import ItemScore from "./ItemScore";
async function getSong(id) {
  const { access_token } = await getSpotifyToken();
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
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
export default function ListScoreSong({ song }) {
  // const data = await getSong(song.spotify_id);
  return (
    <ListItem className="p-1 flex justify-between" ripple={false}>
      <SpotifySearchItem item={song} />
      <ItemScore songID={song.song_id} albumSong={false} />
    </ListItem>
  );
}
