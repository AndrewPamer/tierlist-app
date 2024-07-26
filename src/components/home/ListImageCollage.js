"use client";
// import { createClient } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";
import getSpotifyToken from "@/tools/getSpotifyToken";
import ListItemImage from "./ListItemImage";
import LoadingSpinner from "../LoadingSpinner";

import useSWR from "swr";

async function getItemIDs([listID]) {
  const itemsIDs = [];
  const supabase = createClient();

  const { data: albumsData, error: albumsError } = await supabase
    .from("listalbums")
    .select("spotify_id")
    .eq("list_id", listID)
    .limit(4);

  if (albumsError) {
    throw new Error("Error getting album data");
  }

  itemsIDs.push(
    ...albumsData.map((album) => ({ type: "albums", id: album.spotify_id }))
  );

  if (albumsData.length < 4) {
    const { data: songData, error: songsError } = await supabase
      .from("listsongs")
      .select("spotify_id")
      .eq("list_id", listID)
      .limit(4 - itemsIDs.length);

    if (songsError) {
      throw new Error("Error getting song data");
    }
    itemsIDs.push(
      ...songData.map((song) => ({ type: "tracks", id: song.spotify_id }))
    );
  }
  if (itemsIDs.length < 4) {
    return [itemsIDs[0]];
  }
  return itemsIDs;
}

export default function ListImageCollage({ listID }) {
  const { data: itemsIDs, error, isLoading } = useSWR([listID], getItemIDs);
  const {
    data: spotifyToken,
    error: spotifyError,
    isLoading: spotifyLoading,
  } = useSWR("String", getSpotifyToken);

  if (isLoading || spotifyLoading) {
    return;
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2  ">
      {itemsIDs.map((item, i) => {
        return (
          <ListItemImage
            key={item.id}
            item={item}
            token={spotifyToken}
            className={itemsIDs.length === 1 ? "row-span-2 col-span-2" : ""}
          />
        );
      })}
    </div>
  );
}