import { createClient } from "@/utils/supabase/client";
export default async function UpdateSongScore({ song_id, score, upsert }) {
  const supabase = createClient();
  const {
    data: {
      user: { id },
    },
  } = await supabase.auth.getUser();
  upsert({
    id: song_id,
    user_id: id,
    score,
  });
}
