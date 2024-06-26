import useSWR from "swr";

async function fetcher([url, token, search]) {
  console.log("Search Ran");
  const res = await fetch(
    url +
      new URLSearchParams({
        q: search,
        type: "album",
        market: "US",
        limit: 10,
      }).toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
}

export default function useSpotifySearch({ token, search }) {
  const { data, error, isLoading } = useSWR(
    search ? ["https://api.spotify.com/v1/search?", token, search] : null,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
