import AlbumAccordion from "../tierlists/AlbumAccordion";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import getSpotifyToken from "@/tools/getSpotifyToken";
import ListScoreAlbumsFilter from "./ListScoreAlbumsFilter";
async function getAlbumsInfo(albums) {
  const { access_token } = await getSpotifyToken();

  const albumIdMap = new Map(
    albums.map((album) => [
      album.spotify_id,
      [album.id, album.user_song_scores, album.collaborators],
    ])
  );

  const listAlbums = albums.map((album) => album.spotify_id).join(",");

  const res = await fetch(
    `https://api.spotify.com/v1/albums/?ids=${listAlbums}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  const resJson = await res.json();
  resJson.albums.forEach((album) => {
    album.album_id = albumIdMap.get(album.id)[0];
    album.user_song_scores = albumIdMap.get(album.id)[1];
    album.collaborators = albumIdMap.get(album.id)[2];
  });

  return resJson;
}
export default async function ListScoreAlbum({ albums }) {
  const data = await getAlbumsInfo(albums);
  // return <ListScoreAlbumsFilter albums={data} />;
  return data.albums.map((album) => {
    return (
      <AlbumAccordion
        header={<SpotifySearchItem item={album} />}
        body={<ListScoreAlbumBody album={album} />}
      />
    );
  });
}
