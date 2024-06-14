"use client";
import { useEffect, useState } from "react";

import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";

import FriendCard from "@/components/friends/FriendCard";

import Search from "@/components/friends/Search";
import IncomingRequests from "@/components/friends/IncomingRequests";
import OutgoingRequests from "@/components/friends/OutgoingRequests";

export default function Friends() {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  const supabase = createClient();
  const user = getAuthContext();

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
        setFriends(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    const subscription = supabase
      .channel("friend_db_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friends",
        },
        (payload) => {
          getFriends();
        }
      )
      .subscribe();

    getFriends();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function removeFriend(friend_id) {
    try {
      const { error } = await supabase.rpc("remove_friend", {
        friend_id,
      });

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
    <section className="flex flex-col  mt-3">
      {friends.length !== 0 ? (
        <div className="flex flex-col">
          <h2 className="font-bold self-center">My Friends</h2>
          {friends.map((friend) => {
            return (
              <FriendCard
                key={friend.friend_id}
                name={friend.friend_username}
                buttons={[
                  {
                    buttonTitle: "Remove Friend",
                    popupTitle: `Remove ${friend.friend_username} as a friend`,
                    popupHeader: `Are you sure you want to remove ${friend.friend_username} as a friend?`,
                    popupAction: () => removeFriend(friend.friend_id),
                  },
                ]}
              />
            );
          })}
          <hr className="my-5" />
        </div>
      ) : null}
      <IncomingRequests supabase={supabase} />
      <OutgoingRequests supabase={supabase} />
      <Search supabase={supabase} />
    </section>
  );
}
