"use client";
import { useState } from "react";
import { getListContext } from "../context/ListContextProvider";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import Image from "next/image";

import SortableItem from "../SortableItem";
import SortableProvider from "./SortableProvider";

import AlbumOrSongRadio from "./AlbumOrSongRadio";

export function ListEditItem({ item, onChange, checked }) {
  return (
    <ListItem className="p-0 overflow-hidden" ripple={false}>
      <label
        htmlFor={item.id}
        className="flex w-full cursor-pointer items-center px-2 py-1 "
      >
        <ListItemPrefix>
          <Checkbox
            id={item.id}
            ripple={false}
            className="hover:before:opacity-0"
            containerProps={{
              className: "p-0",
            }}
            onChange={(e) => onChange(e, item)}
            checked={checked}
          />
        </ListItemPrefix>
        <Image
          className="mr-2 h-10 w-10"
          src={item?.images ? item.images[2].url : item.album.images[2].url}
          width={64}
          height={64}
          alt={`Cover Image for ${item.name}`}
        />
        <div>
          <Typography className="font-bold ">{item.name}</Typography>
          <div>
            {item.artists.map((artist, i) => {
              return (
                <span className="text-xs" key={artist.id}>
                  {artist.name}
                  {i !== item.artists.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </div>
        </div>
      </label>
    </ListItem>
  );
}

export default function ListEditPopup() {
  const { list, setList, listLen, removeAlbumsFromList, removeSongsFromList } =
    getListContext();
  const [open, setOpen] = useState(false);
  const [editFilter, setEditFilter] = useState("albums");
  const [selectedItems, setSelectedItems] = useState({});

  const selectedItemLength = selectedItems?.[editFilter]?.length;

  const handleOpen = () => {
    setOpen(!open);
    setEditFilter("albums");
    setSelectedItems({});
  };

  function addToSelectedList(e, item) {
    let albumOrSong = item.type === "album" ? "albums" : "songs";
    if (e.target.checked) {
      //Add to selectedItems
      setSelectedItems((prevList) => {
        const newList = { ...prevList };
        newList[albumOrSong] = [...(newList?.[albumOrSong] || []), item];
        return newList;
      });
    } else {
      //Remove from selectedItems
      setSelectedItems((prevList) => {
        const newList = { ...prevList };
        newList[albumOrSong] = newList[albumOrSong].filter(
          (i) => i.id !== item.id
        );
        return newList;
      });
    }
  }

  return (
    <>
      {listLen > 0 && (
        <Button onClick={handleOpen}>
          view {listLen} item{listLen > 1 ? "s" : ""}
        </Button>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex flex-col items-start">
          Your List
          <Typography variant="small">{listLen} / 100</Typography>
        </DialogHeader>
        <DialogBody className=" flex flex-col gap-2">
          <AlbumOrSongRadio
            albumClick={() => setEditFilter("albums")}
            songClick={() => setEditFilter("songs")}
          />
          {selectedItemLength > 0 ? (
            <Button
              onClick={
                editFilter === "albums"
                  ? () => {
                      removeAlbumsFromList(selectedItems?.albums);
                      setSelectedItems((prevItems) => ({
                        ...prevItems,
                        albums: [],
                      }));
                    }
                  : () => {
                      removeSongsFromList(selectedItems?.songs);
                      setSelectedItems((prevItems) => ({
                        ...prevItems,
                        songs: [],
                      }));
                    }
              }
            >
              Remove {selectedItemLength}{" "}
              {selectedItemLength === 1
                ? editFilter.substring(0, editFilter.length - 1)
                : editFilter}
            </Button>
          ) : null}

          {list?.[editFilter]?.length > 0 && (
            <List className="bg-alt-bg-darker rounded-md flex flex-col items-start justify-stretch max-h-[30rem] overflow-x-hidden	 overflow-y-auto">
              <SortableProvider
                items={list?.[editFilter]}
                setItems={setList}
                type={editFilter}
              >
                {list?.[editFilter]?.map((item, i) => {
                  const checked = selectedItems?.[editFilter]?.find(
                    (el) => el === item
                  );

                  return (
                    <SortableItem key={item.id} id={item.id}>
                      <ListEditItem
                        key={item.id}
                        item={item}
                        onChange={addToSelectedList}
                        checked={!!checked}
                      />
                    </SortableItem>
                  );
                })}
              </SortableProvider>
            </List>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
