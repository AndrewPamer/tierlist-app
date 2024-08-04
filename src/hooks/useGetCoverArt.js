import useSWR from "swr";
import getSpotifyToken from "@/tools/getSpotifyToken";
async function fetcher(url) {
  const { access_token } = await getSpotifyToken();
  const res = await fetch(url, {
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

export default function useGetCoverArt({ ID, type, token }) {
  const { data, error, isLoading } = useSWR(
    `https://api.spotify.com/v1/${type}/${ID}`,
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
