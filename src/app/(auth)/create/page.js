"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

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
      console.error("Item already in list");
    } else {
      setList((prevList) => [...prevList, item]);
    }
  }

  console.log(list);

  if (loading) {
    return "Loading...";
  }

  return (
    <main>
      <h1 className="text-3xl font-bold text-center">Create a new List</h1>
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
