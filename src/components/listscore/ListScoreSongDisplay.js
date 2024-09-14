"use client";
import { ListItem } from "@material-tailwind/react";
import SpotifySearchItemClient from "../tierlists/SpotifySearchItemClient";
import CollabsScore from "./CollabsScore";
import ItemScore from "./ItemScore";
export default function ListScoreSongDisplay({ song }) {
  return (
    <ListItem
      key={song.song_id}
      className="p-1 flex justify-between hover:bg-button-text focus:bg-button-text active:bg-button-text"
      ripple={false}
    >
      <SpotifySearchItemClient item={song} />
      {song.collaborators[0]?.collaborator_id && (
        <CollabsScore collabs={song.collaborators} />
      )}

      <ItemScore
        songID={song.song_id}
        albumSong={false}
        defaultScore={song.score ?? undefined}
      />
    </ListItem>
  );
}
