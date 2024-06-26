"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup({ email, password, username }) {
  const supabase = createClient();
  try {
    const { error: usernameError } = await supabase.rpc(
      "check_unique_username",
      {
        name: username,
      }
    );

    if (usernameError) {
      throw usernameError;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
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
  redirect("/home");
}
