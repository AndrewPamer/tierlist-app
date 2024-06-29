"use client";
import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import SpotifySearch from "@/components/tierlists/SpotifySearch";

import { ToastContainer, toast, Flip } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";

import getSpotifyToken from "@/tools/getSpotifyToken";

import ListItem from "@/components/tierlists/ListItem";
import Form from "@/components/Form";

import FriendSearch from "@/components/friends/FriendSearch";

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
  onSubmit: (d) => console.log(d),
};

export default function Create() {
  const [list, setList] = useState([]);
  const [col, setCol] = useState([]);

  const { data, error, isLoading } = useSWRImmutable(
    "some string",
    getSpotifyToken
  );

  function addToList(item) {
    if (list.some((listEl) => listEl.id === item.id)) {
      toast.warn(`${item.name} is already in the list`);
    } else {
      setList((prevList) => [...prevList, item]);
      //toast(`Added ${item.name} to the list`);
    }
  }

  function removeFromList(item) {
    setList((prevList) => prevList.filter((listEl) => listEl.id !== item.id));
    //toast(`Removed ${item.name} from the list`);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-4">
        <Spinner className=" h-8 w-8" />
      </div>
    );
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
          {}
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
        <SpotifySearch token={data.access_token} onClick={addToList} />
      </Form>

      {list.length > 0 ? (
        <section>
          <h2>Items</h2>
          <div className="grid grid-cols-2 gap-2 max-h-72	overflow-scroll">
            {list.map((item) => {
              return (
                <ListItem item={item} onClick={removeFromList} key={item.id} />
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
