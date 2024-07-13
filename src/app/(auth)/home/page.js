import Link from "next/link";

import { createClient } from "@/utils/supabase/server";

async function getUserData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error, status } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .single();

  return data;
}

export default async function Home() {
  const userData = await getUserData();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl	font-bold">Hello, {userData.username}</h1>
        <Link href="/account">
          <button
            className="bg-red-400 w-8 h-8 rounded-full"
            style={{ backgroundColor: `#${userData.color}` }}
          >
            {userData.username[0].toUpperCase()}
          </button>
        </Link>
      </div>
      <Link href="/create">Create a new List</Link>
    </div>
  );
}
