"use client";
import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";

import SpotifySearch from "@/components/tierlists/SpotifySearch";

import { ToastContainer, toast, Flip } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";

import getSpotifyToken from "@/tools/getSpotifyToken";

import ListItem from "@/components/tierlists/ListItem";

export default function Create() {
  const { data, error, isLoading } = useSWRImmutable(
    "some string",
    getSpotifyToken
  );

  const [list, setList] = useState([]);

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
      <form className="">
        <label className="flex flex-col gap-1">
          <span className="">List Name</span>
          <input className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"></input>
        </label>
        <button className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover ">
          Create List
        </button>
      </form>
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
      <SpotifySearch token={data.access_token} onClick={addToList} />
    </main>
  );
}
