"use client";
import { useState, useMemo } from "react";
import { Input } from "@material-tailwind/react";
import SpotifySearchItemClient from "../tierlists/SpotifySearchItemClient";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import useDebounce from "@/hooks/useDebounce";

export default function ListScoreAlbumsFilter({ albums }) {
  // const [filterAlbums, setFilterAlbums] = useState(albums);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 1500);
  const filterAlbums = useMemo(() => {
    if (debouncedSearchText === "") {
      return albums;
    }
    return albums.filter((album) => {
      return album.name
        .toUpperCase()
        .includes(debouncedSearchText.toUpperCase());
    });
  }, [albums, debouncedSearchText]);
  return (
    <>
      {debouncedSearchText}
      <Input
        label="Search for an album"
        onChange={(e) => {
          //   const filteredArr = albums.filter((album) =>
          //     album.name.toUpperCase().includes(e.target.value.toUpperCase())
          //   );

          //   setFilterAlbums(filteredArr);
          // }
          setSearchText(e.target.value);
        }}
      />
      {filterAlbums.map((album) => {
        return (
          <AlbumAccordion
            header={<SpotifySearchItemClient item={album} />}
            body={<ListScoreAlbumBody album={album} />}
            key={album.id}
          />
        );
      })}
    </>
  );
}
