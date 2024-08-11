"use server";
// import { createClient } from "@/utils/supabase/client";
// import { useUpsertMutation } from "@supabase-cache-helpers/postgrest-swr";
import { createClient } from "@/utils/supabase/server";
export default async function UpdateAlbumSongScore({
  album_id,
  spotify_id,
  score,
  albumSong,
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("listalbumsongscore")
    .upsert({ album_id, user_id: user.id, spotify_id, score })
    .select();

  if (error) {
    return -1;
  }
  return data[0].score;
  // const supabase = createClient();
  // const {
  //   data: {
  //     user: { id },
  //   },
  // } = await supabase.auth.getUser();

  // upsert({
  //   album_id,
  //   user_id: id,
  //   spotify_id,
  //   score,
  // });
  //   const { data, error } = await supabase.rpc("update_album_song_score", {
  //     album_id,
  //     spotify_id,
  //     score,
  //   });
}
