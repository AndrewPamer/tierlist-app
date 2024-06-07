"use client";
import { useState, useCallback } from "react";
import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";

import AccountNavbar from "@/components/menus/AccountNavbar";

export default function Home() {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const user = getAuthContext();
  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user?.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.username);
      }
    } catch (e) {
      alert("error");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  async function getFriends() {
    if (!user) {
      return;
    }
    try {
      const { data, error } = await supabase.rpc("get_friends", {
        userid: user.id,
      });
      console.log(error);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getOutgoingFriendRequests() {
    if (!user) {
      return;
    }
    try {
      const { data, error } = await supabase.rpc(
        "get_outgoing_friend_requests",
        {
          userid: user.id,
        }
      );
      console.log(error);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }
  async function getIncomingFriendRequests() {
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
      console.log(error);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function acceptFriendRequest() {
    if (!user) {
      return;
    }

    try {
      const { data: d, error: e } = await supabase.rpc(
        "get_incoming_friend_requests",
        {
          userid: user.id,
        }
      );
      console.log(d);
      console.log(e);
      const { data, error } = await supabase.rpc("accept_friend_request", {
        requestid: d[0].id,
      });
      console.log(data);
      console.log(error);
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }
  async function sendFriendRequest() {
    if (!user) {
      return;
    }

    try {
      const { data, error } = await supabase.rpc("send_friend_request", {
        sender: user.id,
        recipient: "aedbd5ac-2711-4f8c-9b01-8e9262a5b5c4",
      });
      console.log(data);
      console.log(error);
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  getProfile();

  console.log(user);

  if (loading) {
    return "Loading...";
  }
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl	font-bold">Hello, {name}</h1>
        <AccountNavbar />
      </div>
      <div className="flex flex-col">
        <button className="bg-blue-400" onClick={() => getFriends()}>
          Get Friends
        </button>
        <button
          className="bg-purple-400"
          onClick={() => getOutgoingFriendRequests()}
        >
          Get Outgoing Friend Requests
        </button>
        <button
          className="bg-red-400"
          onClick={() => getIncomingFriendRequests()}
        >
          Get Incoming Friend Requests
        </button>
        <button className="bg-orange-400" onClick={() => sendFriendRequest()}>
          Send friend request
        </button>
        <button className="bg-green-400" onClick={() => acceptFriendRequest()}>
          Accept friend request
        </button>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
