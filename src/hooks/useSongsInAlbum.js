import useSWR from "swr";

async function fetcher([url, token]) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
}

export default function useSongsInAlbum({ albumId, token }) {
  const { data, error, isLoading } = useSWR(
    [`https://api.spotify.com/v1/albums/${albumId}/tracks`, token],
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
