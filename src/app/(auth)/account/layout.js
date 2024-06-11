"use client";
import { useState, useCallback } from "react";

import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";

import Link from "next/link";

export default function AccountLayout({ children }) {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
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
    <main>
      <div className="flex items-center flex-col">
        <div className="flex justify-center items-center bg-red-400 w-24 h-24 rounded-full text-3xl">
          {name[0].toUpperCase()}
        </div>
        <h1 className="text-lg font-bold mt-1">{name}</h1>
        <form action="/auth/signout" method="post">
          <button className="font-bold bg-button-bg text-button-text text-1xl px-2 py-1 rounded-lg hover:bg-button-hover mt-3">
            Log Out
          </button>
        </form>
      </div>
      <ul className="flex mt-5 justify-around">
        <li>
          <Link href="/account">Lists</Link>
        </li>
        <li>
          <Link href="/account/friends">Friends</Link>
        </li>
        <li>
          <Link href="/account/settings">Settings</Link>
        </li>
      </ul>
      {children}
    </main>
  );
}
