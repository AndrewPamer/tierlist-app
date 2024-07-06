"use client";
import { useState, useContext } from "react";
import { ListContext } from "@/app/(auth)/create/page";

import useSpotifySearch from "@/hooks/useSpotifySearch";
import SpotifySearchItem from "./SpotifySearchItem";
import LoadingSpinner from "../LoadingSpinner";
import AlbumOrSongRadio from "./AlbumOrSongRadio";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Input,
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

  const { list } = useContext(ListContext);

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
      <div className="bg-alt-bg p-3 rounded-md mt-2">
        <div className="mb-2">
          <Input label="Search for an album or song" onChange={handleSearch} />
        </div>
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
                      <SpotifySearchItem item={item} />
                    </AccordionHeader>
                    <AccordionBody>
                      <Button
                        fullWidth
                        className="mb-3"
                        onClick={() => albumClick(item)}
                        disabled={list?.albums?.find((el) => el.id === item.id)}
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
                  <SpotifySearchItem
                    key={i}
                    item={item}
                    onClick={songClick}
                    button={true}
                  >
                    <Button
                      className="	ml-auto	px-3 py-1 text-lg"
                      onClick={() => songClick(item)}
                      disabled={list?.songs?.find((el) => el.id === item.id)}
                    >
                      +
                    </Button>
                  </SpotifySearchItem>
                );
              })}
            <div className="flex justify-center mt-5 gap-5">
              {data?.[filter]?.previous ? (
                <Button
                  className="flex"
                  onClick={() => getPage(data[filter].previous, filter)}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                  Previous
                </Button>
              ) : null}
              {data?.[filter]?.next ? (
                <Button
                  className="flex"
                  onClick={() => getPage(data[filter].next, filter)}
                >
                  Next
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
