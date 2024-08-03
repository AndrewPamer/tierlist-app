import { createClient } from "@/utils/supabase/client";
// import { useUpsertMutation } from "@supabase-cache-helpers/postgrest-swr";
export default async function UpdateAlbumSongScore({
  album_id,
  spotify_id,
  score,
  upsert,
}) {
  const supabase = createClient();
  const {
    data: {
      user: { id },
    },
  } = await supabase.auth.getUser();

  upsert({
    album_id,
    user_id: id,
    spotify_id,
    score,
  });
  //   const { data, error } = await supabase.rpc("update_album_song_score", {
  //     album_id,
  //     spotify_id,
  //     score,
  //   });
}
