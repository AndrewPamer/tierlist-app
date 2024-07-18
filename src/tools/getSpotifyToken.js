export const revalidate = 3600;
export default async function getSpotifyToken(url) {
  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      cache: "force-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }).toString(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
