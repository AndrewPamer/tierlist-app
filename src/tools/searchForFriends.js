// import useSWR from "swr";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

// async function fetch([key, search]) {
//   const supabase = createClient();
//   const { data, error } = await supabase.rpc("get_friends", {
//     search,
//   });
//   if (error) {
//     console.error(error);
//     throw new Error("Error Searching For Friends");
//   }

//   return data;
// }

export default function searchForFriends({ search }) {
  const supabase = createClient();
  // const { data, error, isLoading } = useSWR(
  //   search ? ["searchForFriends", search] : null,
  //   fetch
  // );

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
