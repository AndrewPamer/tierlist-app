"use client";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

import useSpotifySearch from "@/hooks/useSpotifySearch";
import ListItem from "./ListItem";
export default function SpotifySearch({ token, onClick }) {
  const [search, setSearch] = useState("");
  const { data, isError, isLoading } = useSpotifySearch({ token, search });

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <section>
      <div>
        <input
          className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          onChange={handleSearch}
          placeholder="Search for an album to add"
        />
        {isLoading ? (
          <div className="flex justify-center mt-4">
            <Spinner className=" h-8 w-8" />
          </div>
        ) : (
          data && (
            <div className="grid grid-cols-2 gap-3">
              {data?.albums?.items?.map((item) => {
                return <ListItem item={item} onClick={onClick} key={item.id} />;
              })}
            </div>
          )
        )}
      </div>
    </section>
  );
}
