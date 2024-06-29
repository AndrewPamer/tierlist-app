"use client";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

import useSpotifySearch from "@/hooks/useSpotifySearch";
import ListItem from "./ListItem";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import SongList from "./SongsList";
export default function SpotifySearch({ token, onClick }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const handleOpen = (value) => setOpen(open === value ? null : value);

  const { data, isError, isLoading } = useSpotifySearch({
    url: "https://api.spotify.com/v1/search?",
    token,
    search,
    queryParams: new URLSearchParams({
      q: search,
      type: ["album"],
      market: "US",
      limit: 10,
    }).toString(),
  });

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  console.log(data);

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
            <div className="bg-alt-bg  p-3 rounded-md mt-2">
              {data?.albums?.items?.map((item, i) => {
                return (
                  <Accordion open={open === i} key={item.id}>
                    <AccordionHeader onClick={() => handleOpen(i)}>
                      <ListItem item={item} onClick={onClick} />
                    </AccordionHeader>
                    <AccordionBody>
                      <SongList token={token} albumId={item.id} />
                    </AccordionBody>
                  </Accordion>
                );
                return;
              })}
              {/* {data?.tracks?.items?.map((item) => {
                return <ListItem item={item} onClick={onClick} key={item.id} />;
              })} */}
            </div>
          )
        )}
      </div>
    </section>
  );
}
