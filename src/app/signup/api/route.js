"use server";

import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  const jsonBody = await request.json();

  const email = jsonBody.email;
  const password = jsonBody.password;
  const username = jsonBody.username;

  const supabase = createClient();

  try {
    //First, check if the username is unique
    const usernameCheck = await supabase.rpc("check_unique_username", {
      name: username,
    });

    if (usernameCheck.error) {
      return new Response(usernameCheck.error.message, {
        status: 400,
      });
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
      return new Response(error.message, {
        status: 400,
      });
    }

    return new Response("Registration Successful", {
      status: 200,
    });
  } catch (e) {
    return new Response("An error occured", {
      status: 500,
    });
  }
}
