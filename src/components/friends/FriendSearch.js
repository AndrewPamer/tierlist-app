"use client";
import { useEffect, useState } from "react";
import searchForFriends from "@/tools/searchForFriends";
export default function FriendSearch() {
  const [search, setSearch] = useState("");
  const { data, isError, isLoading } = searchForFriends({ search });

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <section>
      <input
        className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
        onChange={handleSearch}
        placeholder="Search for a friend"
      />
    </section>
  );
}
