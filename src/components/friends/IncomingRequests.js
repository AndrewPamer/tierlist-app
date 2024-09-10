import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

import FriendCard from "./FriendCard";

async function acceptRequest(requestid) {
  const supabase = createClient();
  try {
    const { error } = await supabase.rpc("accept_friend_request", {
      requestid,
    });
    if (error) {
      throw error;
    }
  } catch (e) {
    console.error(e);
  }
}

async function denyRequest(requestid) {
  const supabase = createClient();
  try {
    const { error } = await supabase.rpc("deny_friend_request", {
      requestid,
    });
    if (error) {
      throw error;
    }
  } catch (e) {
    console.error(e);
  }
}

async function getIncomingRequests() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.rpc("get_incoming_friend_requests");
  return data;
}

export default async function IncomingRequests() {
  const data = await getIncomingRequests();

  if (data.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold self-center">Incoming Friend Requests</h2>
      {data.map((incomingReq) => {
        return (
          <FriendCard
            key={incomingReq.request_id}
            name={incomingReq.sender_username}
            color={incomingReq.color}
            buttons={[
              {
                buttonTitle: "Accept Request",
                popupTitle: `Accept friend request from ${incomingReq.sender_username}`,
                popupHeader: `Are you sure you want to accept the friend request from ${incomingReq.sender_username}?`,
                popupAction: async () => {
                  "use server";
                  acceptRequest(incomingReq.request_id);
                  revalidatePath("/account/friends");
                },
              },
              {
                buttonTitle: "Deny Request",
                popupTitle: `Deny friend request from ${incomingReq.sender_username}`,
                popupHeader: `Are you sure you want to deny the friend request from ${incomingReq.sender_username}?`,
                popupAction: async () => {
                  "use server";
                  denyRequest(incomingReq.request_id);
                  revalidatePath("/account/friends");
                },
              },
            ]}
          />
        );
      })}
      <hr className="my-5" />
    </div>
  );
}
