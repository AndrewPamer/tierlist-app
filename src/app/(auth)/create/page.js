"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getSpotifyToken from "@/tools/getSpotifyToken";

export default function Create() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [albumSearch, setAlbumSearch] = useState({});
  const [list, setList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({ defaultValues: { search: "" } });

  useEffect(() => {
    async function getToken() {
      try {
        const data = await getSpotifyToken();
        setAccessToken(data?.access_token);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getToken();
  }, []);

  async function seachForAlbum({ search }) {
    try {
      const res = await fetch(
        "https://api.spotify.com/v1/search?" +
          new URLSearchParams({
            q: search,
            type: "album",
            market: "US",
            limit: 10,
          }).toString(),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      setAlbumSearch(data.albums);
    } catch (e) {
      console.error(e);
    }
  }

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

  if (loading) {
    return "Loading...";
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
        <button
          className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover "
          // disabled={isSubmitting || isSubmitted}
        >
          Create List
        </button>
      </form>
      {list.length > 0 ? (
        <section>
          <h2>Items</h2>
          <div className="grid grid-cols-2 gap-2 max-h-72	overflow-scroll">
            {list.map((item) => {
              return (
                <button
                  className="bg-alt-bg p-2 rounded-md text-left flex flex-col"
                  onClick={() => removeFromList(item)}
                  key={item.id}
                >
                  <img
                    className="mb-1"
                    src={item.images[0].url}
                    width={640}
                    height={640}
                  />
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <div>
                    {item.artists.map((artist) => {
                      return (
                        <p className="text-sm" key={artist.id}>
                          {artist.name}
                        </p>
                      );
                    })}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}
      <form
        className="flex flex-col justify-center items-center mb-8"
        onSubmit={handleSubmit((data) => seachForAlbum(data))}
      >
        <label htmlFor="search" className="font-bold">
          Search
        </label>
        <div className="flex justify-center items-center gap-2.5">
          <input
            {...register("search")}
            id="search"
            className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          />
          <button className="bg-alt-bg p-2 rounded-xl" disabled={!isDirty}>
            Search
          </button>
        </div>
      </form>
      <section className="grid grid-cols-2 gap-3">
        {albumSearch?.items?.map((album) => {
          return (
            <button
              className="bg-alt-bg p-2 rounded-md text-left"
              onClick={() => addToList(album)}
              key={album.id}
            >
              <img
                className="mb-1"
                src={album.images[0].url}
                width={640}
                height={640}
              />
              <h3 className="text-lg font-bold">{album.name}</h3>
              <div>
                {album.artists.map((artist) => {
                  return (
                    <p className="text-sm" key={artist.id}>
                      {artist.name}
                    </p>
                  );
                })}
              </div>
            </button>
          );
        })}
      </section>
    </main>
  );
}
