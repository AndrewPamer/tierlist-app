import getSpotifyToken from "@/tools/getSpotifyToken";
import SpotifySearch from "./SpotifySearch";
export default async function SpotifySearchWrapper() {
  const token = await getSpotifyToken();
  return <SpotifySearch token={token.access_token} />;
}
