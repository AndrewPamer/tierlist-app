"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login({ email, password }) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data?.weakPassword) {
      throw new Error(
        "Unable to log in. Your password needs to be updated. Try creating a new password and trying again."
      );
    }

    if (error) {
      throw error;
    }
  } catch (e) {
    return {
      error: e.message,
    };
  }
  revalidatePath("/", "layout");
  redirect("/home");
}
