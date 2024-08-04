import useSWR from "swr";
import getSpotifyToken from "@/tools/getSpotifyToken";
async function fetcher(url) {
  const token = await getSpotifyToken();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
}

export default function useGetSpotifySong(songID) {
  const { data, error, isLoading } = useSWR(
    `https://api.spotify.com/v1/tracks/${songID}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
