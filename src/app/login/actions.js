"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login({ email, password }) {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    throw new Error(e.message);
  }
  revalidatePath("/", "layout");
  redirect("/home");
}
