"use server";
import { createClient } from "@/utils/supabase/server";
import getSpotifyToken from "./getSpotifyToken";
async function getCoverArt({ type, id }) {
  const { access_token } = await getSpotifyToken();
  const res = await fetch(`https://api.spotify.com/v1/${type}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
}
async function getItemIDs(listID) {
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

export default async function publicListSearch(search) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("public_list_search", {
    search,
  });
  const dataWithImageItems = await Promise.all(
    data.map(async (list) => {
      const imageItems = await getItemIDs(list.id);
      return {
        imageItems,
        list,
      };
    })
  );

  const dataWithImageSrcs = await Promise.all(
    dataWithImageItems.map(async (item) => {
      const imageSrcs = await Promise.all(
        item.imageItems.map(async (imageItem) => {
          const imageSrc = await getCoverArt({
            type: imageItem.type,
            id: imageItem.id,
          });
          return imageItem.type === "tracks"
            ? imageSrc?.album?.images
            : imageSrc?.images;
        })
      );
      return { imageItems: imageSrcs, list: item.list };
    })
  );
  return dataWithImageSrcs;
}
