"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";

export default function Friends() {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [searched, setSearched] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const supabase = createClient();
  const user = getAuthContext();

  const { register, handleSubmit } = useForm();
  useEffect(() => {
    async function getFriends() {
      if (!user) {
        return;
      }
      try {
        const { data, error } = await supabase.rpc("get_friends", {
          userid: user.id,
        });
        if (error) {
          throw error;
        }
        console.log(data);
        setFriends(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    async function getIncoming() {
      if (!user) {
        return;
      }
      try {
        const { data, error } = await supabase.rpc(
          "get_incoming_friend_requests",
          {
            userid: user.id,
          }
        );
        if (error) {
          throw error;
        }
        console.log(data);
        setIncoming(data);
      } catch (e) {
        console.error(e);
      }
    }
    getFriends();
    getIncoming();
    getOutgoingFriendRequests();
  }, []);

  async function findUsers({ search: name }) {
    try {
      setSearchLoading(true);
      const { data, error } = await supabase.rpc("get_users_not_friends", {
        name,
      });
      if (error) {
        throw error;
      }
      setSearched(data);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  }

  async function sendFriendRequest(recipient) {
    try {
      const { error } = await supabase.rpc("send_friend_request", {
        recipient,
      });
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getOutgoingFriendRequests() {
    try {
      const { data, error } = await supabase.rpc(
        "get_outgoing_friend_requests"
      );
      console.log(data);
      setOutgoing(data);
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) {
    return "Loading...";
  }
  return (
    <section className="flex flex-col gap-10 mt-5">
      <div>
        {friends.map((friend) => {
          return (
            <div key={friend.friend_id} className="flex justify-between">
              <h3>{friend.friend_username}</h3>
              <button>Remove Friend</button>
            </div>
          );
        })}
      </div>
      {incoming.length ? (
        <div className="flex flex-col ">
          <h2 className="font-bold self-center">Incoming Friend Requests</h2>
          {incoming.map((incomingReq) => {
            return (
              <div
                key={incomingReq.id}
                className="flex justify-between items-center"
              >
                <h3>{incomingReq.sender_username}</h3>
                <div className="flex flex-col">
                  <button>Accept</button>
                  <button>Deny</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {outgoing.length ? (
        <div className="flex flex-col ">
          <h2 className="font-bold self-center">Outgoing Friend Requests</h2>
          {outgoing.map((outgoingReq) => {
            return (
              <div
                key={outgoingReq.recipient_id}
                className="flex justify-between items-center"
              >
                <h3>{outgoingReq.recipient_username}</h3>
                <button>Cancel</button>
              </div>
            );
          })}
        </div>
      ) : null}

      <form onSubmit={handleSubmit((data) => findUsers(data))}>
        <label>
          <h2 className="font-bold">Search</h2>
          <input
            {...register("search")}
            className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          />
          <button>Search</button>
        </label>
        <button></button>
      </form>
      {searched
        ? searched.map((search) => {
            return (
              <div key={search.user_id}>
                <h3>{search.username}</h3>
                <button onClick={() => sendFriendRequest(search.user_id)}>
                  Send Friend Request
                </button>
              </div>
            );
          })
        : null}
    </section>
  );
}
