"use client";
import useSWRImmutable from "swr/immutable";
import { useState, createContext } from "react";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";

import SpotifySearch from "@/components/tierlists/SpotifySearch";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getSpotifyToken from "@/tools/getSpotifyToken";

import ListCreateForm from "@/components/tierlists/ListCreateForm";

import FriendSearch from "@/components/friends/FriendSearch";
import LoadingSpinner from "@/components/LoadingSpinner";
import ListEditPopup from "@/components/tierlists/ListEditPopup";

import addTierList from "@/utils/supabase/addTierlist";

export const ListContext = createContext();

export default function Create() {
  const [list, setList] = useState({});
  const [collabs, setCollabs] = useState([]);

  const listLen = (list?.albums?.length || 0) + (list?.songs?.length || 0);

  const { data, error, isLoading } = useSWRImmutable(
    "some string",
    getSpotifyToken
  );

  function addAlbumToList(album) {
    if (listLen === 100) {
      toast.error(
        "The list has reached its maximum size. Remove an item to add this one"
      );
      return;
    }
    if (list?.albums?.some((albumEl) => albumEl.id === album.id)) {
      toast.warn(`${album.name} is already in the list`);
    } else {
      setList((prevList) => {
        const newList = { ...prevList };
        newList.albums = [...(newList?.albums || []), album];

        return newList;
      });
      // toast.success(`${album.name} has been added to the List`);
    }
  }

  function addSongToList(song) {
    if (listLen === 100) {
      toast.error(
        "The list has reached its maximum size. Remove an item to add this one"
      );
      return;
    }
    if (list?.songs?.some((songEl) => songEl.id === song.id)) {
      toast.warn(`${song.name} is already in the list`);
    } else {
      setList((prevList) => {
        const newList = { ...prevList };
        newList.songs = [...(newList?.songs || []), song];

        return newList;
      });
      // toast.success(`${song.name} has been added to the List`);
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

    if (mergedSongs?.length + list?.albums?.length > 100) {
      toast.error(
        "Cannot add songs as it would exceed the maximum size of the list"
      );
      return;
    }

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

  function addCollab(friend) {
    if (collabs.length >= 10) {
      return;
    }
    if (
      collabs?.some(
        (collabFriend) => collabFriend.friend_id === friend.friend_id
      )
    ) {
      toast.warn(`${friend.friend_username} is already a collaborator`);
      console.log(collabs);
    } else {
      setCollabs((prevCollabs) => [...prevCollabs, friend]);
    }
  }

  function removeCollab(friend) {
    setCollabs((prevCollabs) =>
      [...prevCollabs].filter((f) => f.friend_id !== friend.friend_id)
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log(list);

  return (
    <main>
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

      <ListCreateForm onSubmit={(d) => addTierList({ ...d, collabs, list })}>
        <div className="flex flex-col ">
          <Typography className="font-bold ">
            Collaborators {collabs.length ? `(${collabs.length} / 10)` : ""}
          </Typography>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {collabs?.map((collab) => {
              return (
                <Card
                  key={collab.friend_id}
                  className="text-text bg-alt-bg flex items-center p-2 relative"
                >
                  <div
                    className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full"
                    style={{ backgroundColor: `#${collab.color}` }}
                  >
                    {collab.friend_username[0].toUpperCase()}
                  </div>
                  <Typography>{collab.friend_username}</Typography>
                  <Button
                    className="px-2 py-1 text-[0.7rem] mt-2"
                    onClick={() => removeCollab(collab)}
                  >
                    Remove
                  </Button>
                </Card>
              );
            })}
            {collabs.length < 10 ? (
              <Popover>
                <PopoverHandler>
                  <Button
                    type="button"
                    className="flex justify-center items-center rounded-full p-0 w-8 h-8"
                  >
                    +
                  </Button>
                </PopoverHandler>
                <PopoverContent className="">
                  <FriendSearch addCollab={addCollab} />
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
        </div>

        {listLen ? (
          <ListEditPopup
            listLen={listLen}
            list={list}
            setList={setList}
            removeAlbums={removeAlbumsFromList}
            removeSongs={removeSongsFromList}
          />
        ) : null}
        <ListContext.Provider value={{ list, listLen }}>
          <SpotifySearch
            token={data.access_token}
            albumClick={addAlbumToList}
            songClick={addSongToList}
            addSongs={addSongsToList}
          />
        </ListContext.Provider>
      </ListCreateForm>
    </main>
  );
}
