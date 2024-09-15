"use client";
import { memo } from "react";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import ListScoreSongDisplay from "./ListScoreSongDisplay";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
import SpotifySearchItemClient from "../tierlists/SpotifySearchItemClient";
const ListSearch = memo(function ListSearch({ items, album = true, canScore }) {
  if (album) {
    return (
      <>
        {items.map((album) => {
          return (
            <AlbumAccordion
              key={album.id}
              header={<SpotifySearchItemClient item={album} />}
              body={<ListScoreAlbumBody album={album} canScore={canScore} />}
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
          return (
            <ListScoreSongDisplay
              key={song.id}
              song={song}
              canScore={canScore}
            />
          );
        })}
      </>
    );
  }
});

export default ListSearch;
