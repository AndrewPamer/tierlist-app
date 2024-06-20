"use server";

import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  const jsonBody = await request.json();
  const email = jsonBody.email;
  const password = jsonBody.password;
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(error.message, {
        status: 400,
      });
    }

    return new Response("Login Successful", {
      status: 200,
    });
  } catch (e) {
    return new Response("An error occured", {
      status: 500,
    });
  }
}
