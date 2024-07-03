import useSWR from "swr";
import { createClient } from "@/utils/supabase/client";

async function fetch([key, search]) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_friends", {
    search,
  });
  if (error) {
    console.error(error);
    throw new Error("Error Searching For Friends");
  }

  return data;
}

export default function searchForFriends({ search }) {
  const { data, error, isLoading } = useSWR(
    search ? ["searchForFriends", search] : null,
    fetch,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
