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
    getOutgoingFriendRequests();
  }, []);

  if (outgoing.length == 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold self-center">Outgoing Friend Requests</h2>
      {outgoing.map((outgoingReq) => {
        return (
          <FriendCard name={outgoingReq.recipient_username}>
            <button>Cancel</button>
          </FriendCard>
        );
      })}
      <hr className="my-5" />
    </div>
  );
}
