"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function resetpassword({ password }) {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      throw error;
    }
  } catch (e) {
    return {
      error: e.message,
    };
  }
  revalidatePath("/", "layout");
  redirect("/home?alert=passwordreset");
}
