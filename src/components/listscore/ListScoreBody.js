"use client";
import { List } from "@material-tailwind/react";
import { useState } from "react";
import AlbumOrSongRadio from "../tierlists/AlbumOrSongRadio";
import ListScoreAlbum from "./ListScoreAlbum";
import ListScoreSong from "./ListScoreSong";
export default function ListScoreBody({ songs, albums }) {
  const [filter, setFilter] = useState(
    songs.length === 0 ? "albums" : albums.length === 0 ? "songs" : "albums"
  );
  return (
    <div className="flex flex-col gap-5">
      {songs.length !== 0 && albums.length !== 0 && (
        <AlbumOrSongRadio
          albumClick={() => setFilter("albums")}
          songClick={() => setFilter("songs")}
        />
      )}
      {filter === "albums" &&
        albums.map((album) => {
          return <ListScoreAlbum key={album.album_id} album={album} />;
        })}
      {filter === "songs" && (
        <List className="bg-alt-bg-darker ">
          {songs.map((song) => {
            console.log(song);
            return <ListScoreSong key={song.song_id} song={song} />;
          })}
        </List>
      )}
    </div>
  );
}
