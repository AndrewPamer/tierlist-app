import Link from "next/link";
import UserLists from "@/components/home/UserLists";
import CollabLists from "@/components/home/CollabLists";
import PublicListSearch from "@/components/home/PublicListSearch";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/TailwindComponents";

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
  if (error) {
    throw new Error("Error fetching user profile");
  }

  return data;
}

export default async function Home() {
  const userData = await getUserData();
  return (
    <div className="flex flex-col gap-5">
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
      <UserLists />
      <CollabLists />
      <PublicListSearch />

      <Link href="/create">
        <Button fullWidth>Create a new List</Button>
      </Link>
    </div>
  );
}
