"use client";
import { useState } from "react";
import {
  Menu,
  Button,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import UpdateAlbumSongScore from "@/tools/UpdateAlbumSongScore";
import UpdateSongScore from "@/tools/UpdateSongScore";
export default function ItemScore({
  albumID,
  songID,
  albumSong,
  defaultScore,
}) {
  const [score, setScore] = useState(
    defaultScore !== undefined ? defaultScore : "Score"
  );

  return (
    <Menu>
      <MenuHandler>
        <Button className="p-1.5 w-16">{score}</Button>
      </MenuHandler>
      <MenuList className="max-h-72 bg-alt-bg text-text border-text">
        {Array.from({ length: 21 }).map((_, i) => {
          return (
            <MenuItem
              onClick={async () => {
                const newScore = albumSong
                  ? await UpdateAlbumSongScore({
                      album_id: albumID,
                      spotify_id: songID,
                      score: i,
                    })
                  : await UpdateSongScore({ song_id: songID, score: i });
                setScore(newScore);
              }}
              key={i}
            >
              {i}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
