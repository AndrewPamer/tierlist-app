"use client";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

import useSpotifySearch from "@/hooks/useSpotifySearch";
import ListItem from "./ListItem";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import SongList from "./SongsList";
export default function SpotifySearch({ token, onClick }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const handleOpen = (value) => setOpen(open === value ? null : value);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

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
                  <Accordion
                    open={open === i}
                    key={item.id}
                    icon={<Icon id={i} open={open} />}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(i)}
                      // className="text-text "
                    >
                      <ListItem item={item} onClick={onClick} />
                    </AccordionHeader>
                    <AccordionBody>
                      <SongList token={token} albumId={item.id} />
                    </AccordionBody>
                  </Accordion>
                );
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
