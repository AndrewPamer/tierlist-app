"use client";

import { useState, useContext, memo } from "react";

import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import { getListContext } from "../context/ListContextProvider";

import LoadingSpinner from "../LoadingSpinner";
import useSongsInAlbum from "@/hooks/useSongsInAlbum";

const SearchAlbumSongs = memo(function SearchAlbumSongs({
  album,
  token,
  addSongs,
}) {
  const {
    list: { songs, albums },
    listLen,
    addAlbumToList,
    addSongToList,
    addSongsToList,
    removeAlbumsFromList,
    removeSongsFromList,
  } = getListContext();

  const [selectedSongs, setSelectedSongs] = useState([]);
  const { data, isError, isLoading } = useSongsInAlbum(album.id);

  const albumInList = albums?.some((al) => al.id === album.id);

  function handleSongSelect(e, song) {
    if (e.target.checked) {
      setSelectedSongs((prevSongs) => [
        ...prevSongs,
        { ...song, album: album },
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
      {selectedSongs.length > 0 && !albumInList && (
        <Button
          fullWidth
          className="mb-2"
          onClick={() => {
            addSongsToList(selectedSongs);
            setSelectedSongs([]);
          }}
        >
          Add {selectedSongs.length} song{selectedSongs.length > 1 ? "s" : ""}
        </Button>
      )}
      {data?.items?.map((item, i) => {
        const checked = selectedSongs.find((el) => el.id === item.id);
        const disabled = songs?.find((el) => el.id === item.id) || albumInList;
        const overFlow =
          selectedSongs.length + listLen >= 100 && checked === undefined;
        return (
          <ListItem
            className="p-0 "
            key={i}
            ripple={false}
            disabled={disabled || overFlow ? true : false}
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
});

export default SearchAlbumSongs;
