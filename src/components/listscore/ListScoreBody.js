export const maxDuration = 60;

import { Suspense } from "react";
import { List } from "@/components/TailwindComponents";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import ListScoreAlbum from "./ListScoreAlbum";
import ListScoreSong from "./ListScoreSong";
import SpotifySearchItemSkeleton from "../SpotifySearchItemSkeleton";

import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import ListScoreAlbumBody from "./ListScoreAlbumBody";

import getSpotifyToken from "@/tools/getSpotifyToken";

async function getSpotifyItems({ songs, albums }) {
  const { access_token } = await getSpotifyToken();

  const spotifyAlbums = { albums: [] };
  const spotifySongs = { tracks: [] };

  const albumIdMap = new Map(
    albums.map((album) => [album.spotify_id, album.album_id])
  );

  const listAlbums = albums.map((album) => album.spotify_id);
  const albumChunks = [];
  for (let i = 0; i < listAlbums.length; i += 20) {
    albumChunks.push(listAlbums.slice(i, i + 20));
  }

  for (const chunk of albumChunks) {
    const res = await fetch(
      `https://api.spotify.com/v1/albums?ids=${chunk.join(",")}`,
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
      album.album_id = albumIdMap.get(album.id);
    });

    spotifyAlbums.albums.push(...resJson.albums);
  }

  const songIdMap = new Map(
    songs.map((song) => [song.spotify_id, song.song_id])
  );

  const listSongs = songs.map((song) => song.spotify_id);
  const songChunks = [];
  for (let i = 0; i < listSongs.length; i += 50) {
    songChunks.push(listSongs.slice(i, i + 50));
  }

  for (const chunk of songChunks) {
    const res = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${chunk.join(",")}`,
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
    resJson.tracks.forEach((track) => {
      track.song_id = songIdMap.get(track.id);
    });

    spotifySongs.tracks.push(...resJson.tracks);
  }

  return {
    spotifyAlbums: spotifyAlbums.albums,
    spotifySongs: spotifySongs.tracks,
  };
}
export default async function ListScoreBody({ songs, albums }) {
  const data = await getSpotifyItems({ songs, albums });
  return (
    <div className="flex flex-col gap-5">
      {data.spotifyAlbums.length !== 0 && (
        <AlbumAccordion
          header={"Albums"}
          body={
            <div>
              {data.spotifyAlbums.map((album) => {
                return (
                  <AlbumAccordion
                    key={album.album_id}
                    header={<SpotifySearchItem item={album} />}
                    body={<ListScoreAlbumBody album={album} />}
                  />
                );
              })}
            </div>
          }
        />
      )}
      {data.spotifySongs.length !== 0 && (
        <AlbumAccordion
          header={"Songs"}
          body={
            <div>
              {
                <List className="bg-alt-bg-darker ">
                  {data.spotifySongs.map((song) => {
                    return <ListScoreSong song={song} key={song.song_id} />;
                  })}
                </List>
              }
            </div>
          }
        />
      )}
      {/* <AlbumAccordion
        header={"Albums"}
        body={
          <div>
            {albums.map((album) => {
              return (
                <Suspense fallback={<SpotifySearchItemSkeleton />}>
                  <ListScoreAlbum key={album.album_id} album={album} />{" "}
                </Suspense>
              );
            })}
          </div>
        }
      /> */}
      {/* <AlbumAccordion
        header={"Songs"}
        body={
          <div>
            {
              <List className="bg-alt-bg-darker ">
                {songs.map((song) => {
                  return (
                    <Suspense fallback={<SpotifySearchItemSkeleton />}>
                      <ListScoreSong key={song.song_id} song={song} />
                    </Suspense>
                  );
                })}
              </List>
            }
          </div>
        }
      /> */}
    </div>
  );
}
