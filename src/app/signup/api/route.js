"use server";

import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  const jsonBody = await request.json();

  const email = jsonBody.email;
  const password = jsonBody.password;
  const username = jsonBody.username;

  const supabase = createClient();

  try {
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
      console.log(error);
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
