"use client";
import {
  useSubscription,
  useQuery,
} from "@supabase-cache-helpers/postgrest-swr";
import FriendCard from "./FriendCard";

export default function OutgoingRequests({ supabase, user }) {
  const { data, isLoading, error, mutate } = useQuery(
    supabase.rpc("get_outgoing_friend_requests"),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { status } = useSubscription(
    supabase,
    "outgoing_db_changes",
    {
      event: "*",
      schema: "public",
      table: "friendrequests",
      filter: `sender_id=eq.${user.id}`,
    },
    ["id"],
    {
      callback: (payload) => {
        // console.log(payload);
        mutate();
      },
    }
  );

  async function cancelRequest(request_id) {
    try {
      const { error } = await supabase.rpc("cancel_outgoing_friend_request", {
        request_id,
      });

      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoading) {
    return "Loading...";
  }

  if (data.length == 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold self-center">Outgoing Friend Requests</h2>
      {data.map((outgoingReq) => {
        return (
          <FriendCard
            key={outgoingReq.request_id}
            name={outgoingReq.recipient_username}
            color={outgoingReq.color}
            buttons={[
              {
                buttonTitle: "Cancel Request",
                popupTitle: `Cancel friend request to ${outgoingReq.recipient_username}`,
                popupHeader: `Are you sure you want to cancel the friend request to ${outgoingReq.recipient_username}?`,
                popupAction: () => cancelRequest(outgoingReq.request_id),
              },
            ]}
          />
        );
      })}
      <hr className="my-5" />
    </div>
  );
}
