import getSpotifyToken from "@/tools/getSpotifyToken";
import SpotifySearch from "./SpotifySearch";
export default async function SpotifySearchWrapper({
  albumClick,
  songClick,
  addSongs,
}) {
  const token = await getSpotifyToken();
  return (
    <SpotifySearch
      token={token.access_token}
      albumClick={albumClick}
      songClick={songClick}
      addSongs={addSongs}
    />
  );
}
