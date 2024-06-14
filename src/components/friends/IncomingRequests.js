"use client";
import { useState, useEffect } from "react";
import FriendCard from "./FriendCard";
export default function IncomingRequests({ supabase }) {
  const [incoming, setIncoming] = useState([]);

  useEffect(() => {
    async function getIncoming() {
      try {
        const { data, error } = await supabase.rpc(
          "get_incoming_friend_requests"
        );
        if (error) {
          throw error;
        }
        setIncoming(data);
      } catch (e) {
        console.error(e);
      }
    }

    const subscription = supabase
      .channel("incoming_db_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friendrequests",
        },
        (payload) => {
          getIncoming();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };

    getIncoming();
  }, []);

  async function acceptRequest(requestid) {
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

  if (incoming.length == 0) {
    return null;
  }

  return (
    <div className="flex flex-col ">
      <h2 className="font-bold self-center">Incoming Friend Requests</h2>
      {incoming.map((incomingReq) => {
        return (
          <FriendCard
            key={incomingReq.request_id}
            name={incomingReq.sender_username}
            buttons={[
              {
                buttonTitle: "Accept Request",
                popupTitle: `Accept friend request from ${incomingReq.sender_username}`,
                popupHeader: `Are you sure you want to accept the friend request from ${incomingReq.sender_username}?`,
                popupAction: () => acceptRequest(incomingReq.request_id),
              },
              {
                buttonTitle: "Deny Request",
                popupTitle: `Deny friend request from ${incomingReq.sender_username}`,
                popupHeader: `Are you sure you want to deny the friend request from ${incomingReq.sender_username}?`,
                popupAction: () => denyRequest(incomingReq.request_id),
              },
            ]}
          />
        );
      })}
      <hr className="my-5" />
    </div>
  );
}
