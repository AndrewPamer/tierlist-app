"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function searchUsers(search) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_users_not_friends", {
    name: search,
  });

  return { data, error };
}

export async function sendFriendRequest(recipient) {
  const supabase = createClient();
  const { error } = await supabase.rpc("send_friend_request", {
    recipient,
  });

  revalidatePath("/account/friends");

  return error;
}
