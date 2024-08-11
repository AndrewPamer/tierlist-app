"use client";
import { useState } from "react";
import {
  Menu,
  Button,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import LoadingSpinner from "../LoadingSpinner";
import useGetAlbumSongScore from "@/hooks/useGetAlbumSongScore";
import UpdateAlbumSongScore from "@/tools/UpdateAlbumSongScore";
import useGetSongScore from "@/hooks/useGetSongScore";
import UpdateSongScore from "@/tools/UpdateSongScore";
export default function ItemScore({
  albumID,
  songID,
  albumSong,
  defaultScore,
}) {
  const [score, setScore] = useState(defaultScore ? defaultScore : "Score");
  // const { data, isLoading, error, upsert } = albumSong
  //   ? useGetAlbumSongScore({
  //       album_id: albumID,
  //       spotify_id: songID,
  //     })
  //   : useGetSongScore(songID);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <Menu>
      <MenuHandler>
        <Button className="p-1.5 w-16">{score}</Button>
      </MenuHandler>
      <MenuList className="max-h-72 bg-alt-bg text-text border-text">
        {Array.from({ length: 21 }).map((_, i) => {
          return (
            <MenuItem
              // onClick={
              //   () =>
              //   albumSong
              //     ? UpdateAlbumSongScore({
              //         album_id: albumID,
              //         spotify_id: songID,
              //         score: i,
              //         upsert,
              //       })
              //     : UpdateSongScore({
              //         song_id: songID,
              //         score: i,
              //         upsert,
              //       })
              // }
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
