"use client";
import { useState, useCallback } from "react";
import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
export default function Home() {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
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

  getProfile();

  if (loading) {
    return "Loading...";
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl	font-bold">Hello, {name}</h1>
        <Link href="/account">
          <button className="bg-red-400 w-8 h-8 rounded-full">
            {name[0].toUpperCase()}
          </button>
        </Link>
      </div>
      <Link href="/create">Create a new List</Link>
    </div>
  );
}
