"use client";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import FriendCard from "./FriendCard";
import LoadingSpinner from "../LoadingSpinner";
import searchForFriends from "@/tools/searchForFriends";
export default function FriendSearch({ addCollab }) {
  const [search, setSearch] = useState(null);
  const { data, isError, isLoading } = searchForFriends({ search });

  function handleSearch(e) {
    setSearch(e.target.value === "" ? null : e.target.value);
  }

  return (
    <section>
      <Input label="Search for a friend" onChange={handleSearch} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data?.map((friend) => {
          return (
            <FriendCard
              key={friend.friend_id}
              name={friend.friend_username}
              color={friend.color}
              buttons={[
                {
                  buttonTitle: "+",
                  buttonAction: () => addCollab(friend),
                },
              ]}
              popup={false}
            />
          );
        })
      )}
    </section>
  );
}
