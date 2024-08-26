import { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import getSpotifyToken from "@/tools/getSpotifyToken";
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
  // const data = await getAlbumsInfo(albums);
  // const data = await Promise.all(
  //   albums.map(async (album) => {
  //     return await getAlbumsInfo(album);
  //   })
  // );

  // return data.map((album) => {
  //   return album.albums.map((a) => {
  //     return (
  //       <AlbumAccordion
  //         header={<SpotifySearchItem item={a} />}
  //         body={<ListScoreAlbumBody album={a} />}
  //       />
  //     );
  //   });
  // });

  const data = await getAlbumsInfo(albums);
  return data.albums.map((album) => {
    return (
      <AlbumAccordion
        header={<SpotifySearchItem item={album} />}
        body={<ListScoreAlbumBody album={album} />}
      />
    );
  });
}
