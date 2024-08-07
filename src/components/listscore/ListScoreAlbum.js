import AlbumAccordion from "../tierlists/AlbumAccordion";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import getSpotifyToken from "@/tools/getSpotifyToken";
async function getAlbumInfo(id) {
  const { access_token } = await getSpotifyToken();
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
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
export default async function ListScoreAlbum({ album }) {
  const data = await getAlbumInfo(album.spotify_id);

  return (
    <AlbumAccordion
      header={<SpotifySearchItem item={data} />}
      body={<ListScoreAlbumBody album={album} />}
    />
  );
}
