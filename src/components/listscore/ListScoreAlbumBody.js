import { List, ListItem, Typography } from "@/components/TailwindComponents";

import ItemScore from "./ItemScore";
import CollabsScore from "./CollabsScore";

export default function ListScoreAlbumBody({ album }) {
  let songScoreDict = {};
  album.user_song_scores.forEach((score) => {
    songScoreDict[score.song_id] = score.score;
  });
  let collabSongScoreDict = {};
  album.collaborators.forEach((c) => {
    collabSongScoreDict[c.collaborator_id] = [];
    c?.scores?.forEach((s) => {
      collabSongScoreDict[c.collaborator_id][s.spotify_id] = s.score;
    });
  });

  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {album.tracks.items.map((item, i) => {
        return (
          <ListItem
            className="p-1.5 flex justify-between hover:bg-alt-bg focus:bg-alt-bg active:bg-alt-bg hover:text-text focus:text-text active:text-text"
            key={i}
            ripple={false}
          >
            <Typography>{item.name}</Typography>
            {album.collaborators[0].collaborator_id && (
              <CollabsScore
                collabs={album.collaborators.map((collab) => {
                  return {
                    ...collab,
                    score: collabSongScoreDict[collab.collaborator_id][item.id],
                  };
                })}
              />
            )}
            <ItemScore
              albumID={album.album_id}
              songID={item.id}
              albumSong={true}
              defaultScore={songScoreDict[item.id]}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
