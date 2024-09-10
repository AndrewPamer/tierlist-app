"use server";
import { createClient } from "./server";
import { revalidatePath } from "next/cache";
export default async function deleteList(listID) {
  const supabase = createClient();

  const res = await supabase.from("tierlists").delete().eq("id", listID);
  revalidatePath("/account");
  return res;
}
