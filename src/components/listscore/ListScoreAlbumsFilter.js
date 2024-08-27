"use client";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import SpotifySearchItemClient from "../tierlists/SpotifySearchItemClient";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import AlbumAccordion from "../tierlists/AlbumAccordion";

export default function ListScoreAlbumsFilter({ albums }) {
  const [filterAlbums, setFilterAlbums] = useState(albums);

  return (
    <>
      <Input
        label="Search for an album"
        onChange={(e) => {
          const filteredArr = albums.albums.filter((album) =>
            album.name.toUpperCase().includes(e.target.value.toUpperCase())
          );

          setFilterAlbums({ albums: filteredArr });
        }}
      />
      {filterAlbums.albums.map((album) => {
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
