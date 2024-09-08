"use client";
import { memo } from "react";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import SpotifySearchItemClient from "../tierlists/SpotifySearchItemClient";
const ListSearch = memo(function ListSearch({ albums }) {
  return (
    <>
      {albums.map((album) => {
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
});

export default ListSearch;
