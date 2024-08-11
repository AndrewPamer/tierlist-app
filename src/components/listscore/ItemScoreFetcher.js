import { createClient } from "@/utils/supabase/server";
import ItemScore from "./ItemScore";
async function getAlbumSongScore({ songID, albumID }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("listalbumsongscore")
    .select("score")
    .eq("album_id", albumID)
    .eq("user_id", user.id)
    .eq("spotify_id", songID);

  return data[0];
}

async function getSongScore(id) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("listsongscore")
    .select("score")
    .eq("id", id)
    .eq("user_id", user.id);

  return data[0];
}

export default async function ItemScoreFetcher({
  albumID,
  songID,
  albumSong = true,
}) {
  const data = albumSong
    ? await getAlbumSongScore({ songID, albumID })
    : await getSongScore(songID);

  return (
    <ItemScore
      albumID={albumID}
      songID={songID}
      albumSong={albumSong}
      defaultScore={data?.score ?? null}
    />
  );
}
