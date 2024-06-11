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
    getIncoming();
  }, []);

  if (incoming.length == 0) {
    return null;
  }

  return (
    <div className="flex flex-col ">
      <h2 className="font-bold self-center">Incoming Friend Requests</h2>
      {incoming.map((incomingReq) => {
        return (
          <FriendCard name={incomingReq.sender_username}>
            <div className="flex flex-col">
              <button>Accept</button>
              <button>Deny</button>
            </div>
          </FriendCard>
        );
      })}
      <hr className="my-5" />
    </div>
  );
}
