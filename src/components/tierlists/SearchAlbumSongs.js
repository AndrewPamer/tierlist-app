"use client";

import { useState, useContext } from "react";

import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import { ListContext } from "@/app/(auth)/create/page";

import LoadingSpinner from "../LoadingSpinner";
import useSongsInAlbum from "@/hooks/useSongsInAlbum";

export default function SearchAlbumSongs({ album, token, addSongs }) {
  const list = useContext(ListContext);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const { data, isError, isLoading } = useSongsInAlbum({
    albumId: album.id,
    token,
  });

  function handleSongSelect(e, song) {
    if (e.target.checked) {
      setSelectedSongs((prevSongs) => [
        ...prevSongs,
        { ...song, images: album.images },
      ]);
    } else {
      setSelectedSongs((prevSongs) =>
        [...prevSongs].filter((i) => i.id !== song.id)
      );
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {selectedSongs.length > 0 && (
        <Button
          fullWidth
          className="mb-2"
          onClick={() => {
            addSongs(selectedSongs);
            setSelectedSongs([]);
          }}
        >
          Add {selectedSongs.length} song{selectedSongs.length > 1 ? "s" : ""}
        </Button>
      )}
      {data?.items?.map((item, i) => {
        const checked = selectedSongs.find((el) => el.id === item.id);
        const disabled = list?.songs?.find((el) => el.id === item.id);
        return (
          <ListItem
            className="p-0 "
            key={i}
            ripple={false}
            disabled={disabled ? true : false}
          >
            <label
              htmlFor={item.id}
              className="flex w-full cursor-pointer items-center px-3 py-2 "
            >
              <ListItemPrefix>
                <Checkbox
                  id={item.id}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0 ",
                  }}
                  onChange={(e) => handleSongSelect(e, item)}
                  checked={disabled ? true : checked ? true : false}
                />
              </ListItemPrefix>
              <Typography>{item.name}</Typography>
            </label>
          </ListItem>
        );
      })}
    </List>
  );
}
