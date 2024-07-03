"use client";
import { useState } from "react";

import useSpotifySearch from "@/hooks/useSpotifySearch";
import ListItem from "./ListItem";
import LoadingSpinner from "../LoadingSpinner";
import AlbumOrSongRadio from "./AlbumOrSongRadio";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  ListItem as LI,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import SearchAlbumSongs from "./SearchAlbumSongs";
export default function SpotifySearch({
  token,
  albumClick,
  songClick,
  addSongs,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("albums");
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

  const { data, isError, isLoading, mutate } = useSpotifySearch({
    url: "https://api.spotify.com/v1/search?",
    token,
    search,
    queryParams: new URLSearchParams({
      q: search,
      type: ["album", "track"],
      market: "US",
      limit: 10,
    }).toString(),
  });

  async function getPage(url, filter) {
    const nextData = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newData = await nextData.json();

    mutate(
      (prevData) => ({
        ...prevData,
        [filter]: newData[filter],
      }),
      false
    );
  }

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
        <div className="bg-alt-bg  p-3 rounded-md mt-2">
          <AlbumOrSongRadio
            albumClick={() => setFilter("albums")}
            songClick={() => setFilter("tracks")}
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {filter === "albums" &&
                data?.albums?.items?.map((item, i) => {
                  return (
                    <Accordion
                      open={open === i}
                      key={item.id}
                      icon={<Icon id={i} open={open} />}
                    >
                      <AccordionHeader onClick={() => handleOpen(i)}>
                        <ListItem item={item} />
                      </AccordionHeader>
                      <AccordionBody>
                        <Button
                          fullWidth
                          className="mb-3"
                          onClick={() => albumClick(item)}
                        >
                          Add {item.name}
                        </Button>
                        <SearchAlbumSongs
                          token={token}
                          album={item}
                          addSongs={addSongs}
                        />
                      </AccordionBody>
                    </Accordion>
                  );
                })}

              {filter === "tracks" &&
                data?.tracks?.items?.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      item={item}
                      onClick={songClick}
                      button={true}
                    />
                  );
                })}
              <div className="flex justify-center mt-5 gap-5">
                {data?.[filter]?.previous ? (
                  <Button
                    className="flex"
                    onClick={() => getPage(data[filter].previous, filter)}
                  >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                    Previous
                  </Button>
                ) : null}
                {data?.[filter]?.next ? (
                  <Button
                    className="flex"
                    onClick={() => getPage(data[filter].next, filter)}
                  >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> Next
                  </Button>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
