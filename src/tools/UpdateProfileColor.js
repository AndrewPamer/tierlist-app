"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
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

  if (!error) {
    revalidatePath("/home");
  }

  return data[0].color;
}
