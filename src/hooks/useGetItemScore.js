import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { useUpsertItem } from "@supabase-cache-helpers/postgrest-swr";
export default function useGetItemScore({ album, table }) {
  const supabase = createClient();
  const { data, isLoading, error } = useQuery(
    supabase.from(table).select("score").eq("id", itemID)
  );

  return {
    data,
    isLoading,
    error,
  };
}
