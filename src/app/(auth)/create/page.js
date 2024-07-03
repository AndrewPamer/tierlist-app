"use client";
import useSWRImmutable from "swr/immutable";
import { useState } from "react";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import SpotifySearch from "@/components/tierlists/SpotifySearch";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getSpotifyToken from "@/tools/getSpotifyToken";

import Form from "@/components/Form";

import FriendSearch from "@/components/friends/FriendSearch";
import LoadingSpinner from "@/components/LoadingSpinner";
import ListEditPopup from "@/components/tierlists/ListEditPopup";

const formElements = {
  elements: [
    {
      title: "Name",
      type: "text",
      required: true,
    },
    {
      registerTitle: "Visibility",
      title: "Visibility",
      type: "radio",
      value: "Public",
      required: true,
    },
    {
      registerTitle: "Visibility",
      type: "radio",
      value: "Private",
      required: true,
    },
  ],
  submitButtonText: "Create List",
  // onSubmit: (d) => console.log(d),
};

export default function Create() {
  const [list, setList] = useState({});
  const [col, setCol] = useState([]);

  const listLen = (list?.albums?.length || 0) + (list?.songs?.length || 0);
  // console.log(listLen);

  const { data, error, isLoading } = useSWRImmutable(
    "some string",
    getSpotifyToken
  );

  function addAlbumToList(album) {
    if (list?.albums?.some((albumEl) => albumEl.id === album.id)) {
      toast.warn(`${album.name} is already in the list`);
    } else {
      setList((prevList) => {
        const newList = { ...prevList };
        newList.albums = [...(newList?.albums || []), album];

        return newList;
      });
      toast.success(`${album.name} has been added to the List`);
    }
  }

  function addSongToList(song) {
    if (list?.songs?.some((songEl) => songEl.id === song.id)) {
      toast.warn(`${song.name} is already in the list`);
    } else {
      setList((prevList) => {
        const newList = { ...prevList };
        newList.songs = [...(newList?.songs || []), song];

        return newList;
      });
      toast.success(`${song.name} has been added to the List`);
    }
  }

  function addSongsToList(songs) {
    const merge = (a, b, predicate = (a, b) => a === b) => {
      const c = [...a];
      b.forEach((bItem) =>
        c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
      );
      return c;
    };

    const mergedSongs = merge(
      songs,
      list?.songs || [],
      (a, b) => a.id === b.id
    );
    setList((prevList) => {
      const newList = { ...prevList };
      newList.songs = mergedSongs;
      return newList;
    });
    toast.success(
      `${songs.length} song${songs.length > 1 ? "s" : ""} added to the list`
    );
  }

  function removeAlbumsFromList(albums) {
    setList((prevList) => {
      const newList = { ...prevList };
      newList.albums = newList.albums.filter((e) => !albums.includes(e));

      return newList;
    });
  }

  function removeSongsFromList(songs) {
    setList((prevList) => {
      const newList = { ...prevList };
      newList.songs = newList.songs.filter((e) => !songs.includes(e));

      return newList;
    });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <FriendSearch />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />

      <h1 className="text-3xl font-bold text-center">Create a new List</h1>
      <Form data={formElements}>
        <div>
          <span className="text-sm font-bold">Collaborators</span>
          <Popover>
            <PopoverHandler>
              <button
                type="button"
                className="flex justify-center items-center bg-green-800 w-8 h-8 rounded-full"
              >
                +
              </button>
            </PopoverHandler>
            <PopoverContent>Search for a friend to Add</PopoverContent>
          </Popover>
        </div>

        {listLen ? (
          <ListEditPopup
            listLen={listLen}
            list={list}
            removeAlbums={removeAlbumsFromList}
            removeSongs={removeSongsFromList}
          />
        ) : null}

        <SpotifySearch
          token={data.access_token}
          albumClick={addAlbumToList}
          songClick={addSongToList}
          addSongs={addSongsToList}
        />
      </Form>
    </main>
  );
}
