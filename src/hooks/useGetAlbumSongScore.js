"use server";
// import { createClient } from "@/utils/supabase/client";
// import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
// import { useUpsertMutation } from "@supabase-cache-helpers/postgrest-swr";
// import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/server";
export default async function useGetAlbumSongScore({
  album_id,
  spotify_id,
  albumSong,
}) {
  // const { id } = getAuthContext();
  //   const { data, error } = supabase.rpc("get_album_song_score", {
  //     album_id,
  //     spotify_id,
  //   });
  // const { data, isLoading, error } = useQuery(
  //   supabase
  //     .from("listalbumsongscore")
  //     .select("score")
  //     .eq("album_id", album_id)
  //     .eq("user_id", id)
  //     .eq("spotify_id", spotify_id),
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //   }
  // );
  //   const { data, isLoading, error } = useQuery(
  //     supabase.rpc("get_album_song_score", {
  //       album_id,
  //       spotify_id,
  //     }),
  //     {
  //       revalidateOnFocus: false,
  //     }
  //   );
  // const { trigger: upsert } = useUpsertMutation(
  //   supabase.from("listalbumsongscore"),
  //   ["album_id", "user_id", "spotify_id"],
  //   "score",
  //   {
  //     onSuccess: () => console.log("Success!"),
  //   }
  // );
  // return {
  //   data,
  //   isLoading,
  //   error,
  //   upsert,
  // };
}
