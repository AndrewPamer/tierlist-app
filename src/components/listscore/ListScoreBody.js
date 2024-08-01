"use client";
import { useState } from "react";
import AlbumOrSongRadio from "../tierlists/AlbumOrSongRadio";
import ListScoreAlbum from "./ListScoreAlbum";
import ListScoreSong from "./ListScoreSong";
export default function ListScoreBody({ songs, albums }) {
  console.log(songs, albums);
  const [filter, setFilter] = useState(
    songs.length === 0 ? "albums" : albums.length === 0 ? "songs" : "albums"
  );
  return (
    <div>
      {songs.length !== 0 && albums.length !== 0 && (
        <AlbumOrSongRadio
          albumClick={() => setFilter("albums")}
          songClick={() => setFilter("songs")}
        />
      )}
      {filter === "albums" &&
        albums.map((album) => {
          return (
            <ListScoreAlbum key={album.album_id} albumID={album.spotify_id} />
          );
        })}
      {filter === "songs" &&
        songs.map((song) => {
          return <ListScoreSong key={song.song_id} songID={song.spotify_id} />;
        })}
    </div>
  );
}
