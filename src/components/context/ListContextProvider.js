"use client";

import { useContext, createContext, useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ListContext = createContext();

export function getListContext() {
  return useContext(ListContext);
}

export function ListContextProvider({ children }) {
  const [list, setList] = useState({});
  const listLen = (list?.albums?.length || 0) + (list?.songs?.length || 0);

  const dataSuite = {
    list,
    setList,
    listLen,
    addAlbumToList: (album) => {
      console.log(album);
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
          newList.songs = [
            ...(newList?.songs || []).filter(
              (song) => song.album.id !== album.id
            ),
          ];

          return newList;
        });
        // toast.success(`${album.name} has been added to the List`);
      }
    },
    addSongToList: (song) => {
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
    },
    addSongsToList: (songs) => {
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
    },
    removeAlbumsFromList: (albums) => {
      setList((prevList) => {
        const newList = { ...prevList };
        newList.albums = newList.albums.filter((e) => !albums.includes(e));

        return newList;
      });
    },
    removeSongsFromList: (songs) => {
      setList((prevList) => {
        const newList = { ...prevList };
        newList.songs = newList.songs.filter((e) => !songs.includes(e));

        return newList;
      });
    },
  };

  return (
    <ListContext.Provider value={dataSuite}>
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
      {children}
    </ListContext.Provider>
  );
}
