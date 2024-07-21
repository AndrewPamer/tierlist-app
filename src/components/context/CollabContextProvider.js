"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, createContext, useState } from "react";
const CollabContext = createContext();

export function getCollabContext() {
  return useContext(CollabContext);
}

export function CollabContextProvider({ children }) {
  const [collabs, setCollabs] = useState([]);
  const dataSuite = {
    collabs,
    addCollab: (friend) => {
      if (collabs.length >= 10) {
        return;
      }
      if (
        collabs?.some(
          (collabFriend) => collabFriend.friend_id === friend.friend_id
        )
      ) {
        toast.warn(`${friend.friend_username} is already a collaborator`);
      } else {
        setCollabs((prevCollabs) => [...prevCollabs, friend]);
      }
    },
    removeCollab: (friend) => {
      setCollabs((prevCollabs) =>
        [...prevCollabs].filter((f) => f.friend_id !== friend.friend_id)
      );
    },
  };

  return (
    <CollabContext.Provider value={dataSuite}>
      {children}
    </CollabContext.Provider>
  );
}
