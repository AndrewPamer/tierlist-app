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
  Radio,
  Card,
  List,
  ListItem as LI,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import SongList from "./SongsList";
export default function SpotifySearch({ token, albumClick, songClick }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("albums");
  const [page, setPage] = useState(null);
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
    url: page ? page : "https://api.spotify.com/v1/search?",
    token,
    search,
    queryParams: !page
      ? new URLSearchParams({
          q: search,
          type: ["album", "track"],
          market: "US",
          limit: 10,
        }).toString()
      : "",
  });

  async function getPage(url, filter) {
    const nextData = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newData = await nextData.json();

    console.log(newData);

    mutate(
      (prevData) => ({
        ...prevData,
        [filter]: newData[filter],
      }),
      false
    );
  }

  console.log(data);

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
          <Card className="">
            <List className="bg-alt-bg-darker rounded-md  flex-row">
              <LI className="p-0" ripple={false}>
                <label
                  htmlFor="albums"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="horizontal-list"
                      id="albums"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0 ",
                      }}
                      defaultChecked
                      onClick={() => setFilter("albums")}
                    />
                  </ListItemPrefix>
                  <Typography>Albums</Typography>
                </label>
              </LI>
              <LI className="p-0" ripple={false}>
                <label
                  htmlFor="songs"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="horizontal-list"
                      id="songs"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0 ",
                      }}
                      onClick={() => setFilter("tracks")}
                    />
                  </ListItemPrefix>
                  <Typography>Songs</Typography>
                </label>
              </LI>
            </List>
          </Card>
          {isLoading ? (
            <div className="flex justify-center mt-4">
              <Spinner className=" h-8 w-8" />
            </div>
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
                        <SongList token={token} albumId={item.id} />
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
