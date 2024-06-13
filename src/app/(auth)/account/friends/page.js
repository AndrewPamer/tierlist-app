"use client";
import { useEffect, useState } from "react";

import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";

import FriendCard from "@/components/friends/FriendCard";
import DialogPopup from "@/components/DialogPopup";

import Search from "@/components/friends/Search";
import IncomingRequests from "@/components/friends/IncomingRequests";
import OutgoingRequests from "@/components/friends/OutgoingRequests";

export default function Friends() {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const [deleteFriend, setDeleteFriend] = useState({});

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

    getFriends();
  }, []);

  function showPopup(id, name) {
    console.log(id, name);
    setPopup(
      <DialogPopup
        onClose={() => setPopup(null)}
        title={`Remove ${name} as a friend`}
        header={`Are you sure you want to remove ${name} as a friend?`}
      />
    );
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
              <FriendCard key={friend.friend_id} name={friend.friend_username}>
                <button
                  onClick={() =>
                    showPopup(friend.friend_id, friend.friend_username)
                  }
                >
                  Remove Friend
                </button>
              </FriendCard>
            );
          })}
          <hr className="my-5" />
        </div>
      ) : null}
      <IncomingRequests supabase={supabase} />
      <OutgoingRequests supabase={supabase} />
      <Search supabase={supabase} />
      {popup}
      {/* {isOpen && deleteFriend && (
        <DialogPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={`Are you sure you want to remove ${deleteFriend.name} as a friend?`}
          action={() => console.log("F")}
        />
      )} */}
    </section>
  );
}
