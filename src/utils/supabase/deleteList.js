"use server";
import { createClient } from "./server";

export default async function deleteList(listID) {
  const supabase = createClient();

  const res = await supabase.from("tierlists").delete().eq("id", listID);
  return res;
}
