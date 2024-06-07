"use client";
import { useState } from "react";
import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";
export default function Home() {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const user = getAuthContext();
  const getProfile = async () => {
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
  };

  getProfile();

  if (loading) {
    return "Loading...";
  }
  return (
    <div>
      <h1>Welcome to the home page {name}</h1>
      <form action="/auth/signout" method="post">
        <button className="button block" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
