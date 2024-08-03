import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { useUpsertMutation } from "@supabase-cache-helpers/postgrest-swr";
import { getAuthContext } from "@/components/context/AuthContextProvider";
export default function useGetSongScore(song_id) {
  const supabase = createClient();
  const { id } = getAuthContext();
  const { data, isLoading, error } = useQuery(
    supabase
      .from("listsongscore")
      .select("score")
      .eq("user_id", id)
      .eq("id", song_id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { trigger: upsert } = useUpsertMutation(
    supabase.from("listsongscore"),
    ["user_id", "id"],
    "score",
    {
      onSuccess: () => console.log("Song Suc"),
    }
  );

  return {
    data,
    isLoading,
    error,
    upsert,
  };
}
