import { createClient } from "@/utils/supabase/server";
import HomePageListCard from "./HomePageListCard";

async function getCollabLists() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase
    .from("listcollaborators")
    .select("tierlists(*)")
    .eq("collaborator_id", user.id);
  return data.map((d) => d.tierlists);
}

export default async function CollabLists() {
  const collabLists = await getCollabLists();
  return <HomePageListCard header={"Collaborator Lists"} lists={collabLists} />;
}
