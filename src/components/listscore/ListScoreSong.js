import { Suspense } from "react";
import { ListItem } from "@/components/TailwindComponents";
import LoadingSpinner from "../LoadingSpinner";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import getSpotifyToken from "@/tools/getSpotifyToken";
import ItemScoreFetcher from "./ItemScoreFetcher";
import CollabsScore from "./CollabsScore";
import ItemScore from "./ItemScore";
async function getSongs(songs) {
  const { access_token } = await getSpotifyToken();
  const songIdMap = new Map(
    songs.map((song) => [
      song.spotify_id,
      [song.id, song.score, song.collaborators],
    ])
  );
  const listSongs = songs.map((song) => song.spotify_id).join(",");

  const res = await fetch(
    `https://api.spotify.com/v1/tracks/?ids=${listSongs}`,
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
  resJson.tracks.forEach((song) => {
    song.song_id = songIdMap.get(song.id)[0];
    song.score = songIdMap.get(song.id)[1];
    song.collaborators = songIdMap.get(song.id)[2];
  });
  return resJson;
}
export default async function ListScoreSong({ songs }) {
  const data = await getSongs(songs);
  return data.tracks.map((song) => {
    return (
      <ListItem
        key={song.song_id}
        className="p-1 flex justify-between hover:bg-button-text focus:bg-button-text active:bg-button-text"
        ripple={false}
      >
        <SpotifySearchItem item={song} />
        {song.collaborators[0].collaborator_id && (
          <CollabsScore collabs={song.collaborators} />
        )}

        <ItemScore
          songID={song.song_id}
          albumSong={false}
          defaultScore={song.score ?? undefined}
        />
      </ListItem>
    );
  });
}
