import { createClient } from "@/utils/supabase/client";
import { useUpsertMutation } from "@supabase-cache-helpers/postgrest-swr";
export default function useUpdateItemScore({ itemID, table }) {
  const supabase = createClient();
  const { trigger: upsert } = useUpsertMutation(
    supabase.from(table),
    ["id"],
    "score",
    {
      onSuccess: () => console.log("Success!"),
    }
  );
  return upsert;
}
