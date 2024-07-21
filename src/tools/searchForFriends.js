import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

export default function searchForFriends({ search }) {
  const supabase = createClient();

  const { data, isLoading, error } = useQuery(
    supabase.rpc("get_friends", {
      search,
    })
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
