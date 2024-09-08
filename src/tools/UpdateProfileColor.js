"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdateProfileColor(color) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({ color })
    .eq("id", user.id)
    .select();

  return data[0].color;
}
