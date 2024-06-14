"use client";
import { useState, useEffect } from "react";

import FriendCard from "./FriendCard";

export default function OutgoingRequests({ supabase }) {
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
    async function getOutgoingFriendRequests() {
      try {
        const { data, error } = await supabase.rpc(
          "get_outgoing_friend_requests"
        );
        setOutgoing(data);
        if (error) {
          throw error;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const subscription = supabase
      .channel("outgoing_db_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friendrequests",
        },
        (payload) => {
          getOutgoingFriendRequests();
        }
      )
      .subscribe();

    getOutgoingFriendRequests();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  if (outgoing.length == 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold self-center">Outgoing Friend Requests</h2>
      {outgoing.map((outgoingReq) => {
        return (
          <FriendCard
            key={outgoingReq.request_id}
            name={outgoingReq.recipient_username}
            buttons={[
              {
                buttonTitle: "Cancel Request",
                popupTitle: `Cancel friend request to ${outgoingReq.recipient_username}`,
                popupHeader: `Are you sure you want to cancel the friend request to ${outgoingReq.recipient_username}?`,
                popupAction: () => cancelRequest(outgoingReq.request_id),
              },
            ]}
          />
          // <FriendCard name={outgoingReq.recipient_username}>
          //   <button>Cancel</button>
          // </FriendCard>
        );
      })}
      <hr className="my-5" />
    </div>
  );
}
