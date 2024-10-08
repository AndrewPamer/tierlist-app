import useSWR from "swr";
import getSpotifyToken from "@/tools/getSpotifyToken";
async function fetcher([url, token, queryParams]) {
  const { access_token } = await getSpotifyToken();
  const res = await fetch(url + queryParams, {
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

export default function useSpotifySearch({ url, token, search, queryParams }) {
  const { data, error, isLoading, mutate } = useSWR(
    search ? [url, token, queryParams] : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}
