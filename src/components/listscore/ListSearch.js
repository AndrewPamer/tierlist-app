"use client";
import { memo } from "react";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import ListScoreSongDisplay from "./ListScoreSongDisplay";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import SpotifySearchItemClient from "../tierlists/SpotifySearchItemClient";
const ListSearch = memo(function ListSearch({ items, album = true }) {
  if (album) {
    return (
      <>
        {items.map((album) => {
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
  if (!album) {
    return (
      <>
        {items.map((song) => {
          return <ListScoreSongDisplay key={song.id} song={song} />;
        })}
      </>
    );
  }
});

export default ListSearch;
