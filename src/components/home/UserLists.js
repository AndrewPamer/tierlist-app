import { createClient } from "@/utils/supabase/server";
import HomePageListCard from "./HomePageListCard";
async function getUserLists() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase
    .from("tierlists")
    .select()
    .eq("creator_id", user.id);
  return data;
}

export default async function UserLists() {
  const userLists = await getUserLists();
  return <HomePageListCard header={"Your Lists"} lists={userLists} />;
}
