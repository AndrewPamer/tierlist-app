"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";

import FriendCard from "./FriendCard";

export default function Search({ supabase }) {
  const [searched, setSearched] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);
  const { register, handleSubmit } = useForm();
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
      setFirstSearch(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  }

  let searchDisplay = undefined;

  if (searchLoading) {
    searchDisplay = <p className="text-center">Loading...</p>;
  } else if (searched.length == 0 && firstSearch) {
    searchDisplay = <p className="text-center font-bold">No Results</p>;
  } else {
    searchDisplay = searched.map((search) => {
      return (
        <FriendCard name={search.username}>
          <button onClick={() => sendFriendRequest(search.user_id)}>
            Send Friend Request
          </button>
        </FriendCard>
      );
    });
  }

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit((data) => findUsers(data))}
      >
        <label htmlFor="search" className="font-bold">
          Search
        </label>
        <div className="flex justify-center items-center gap-2.5">
          <input
            {...register("search")}
            id="search"
            className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          />
          <button className="bg-alt-bg p-2 rounded-xl">
            <BsSearch size={20} />
          </button>
        </div>
      </form>
      {searchDisplay}
    </div>
  );
}
