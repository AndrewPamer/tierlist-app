// import { createClient } from "@/utils/supabase/client";
"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdateSongScore({ song_id, score }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("listsongscore")
    .upsert({ user_id: user.id, id: song_id, score })
    .select();

  if (error) {
    return -1;
  }
  return data[0].score;
}
