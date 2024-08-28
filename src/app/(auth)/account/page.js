import Link from "next/link";
import { Suspense } from "react";
import HomePageListCard from "@/components/home/HomePageListCard";
import { createClient } from "@/utils/supabase/server";
import { Card, Typography } from "@/components/TailwindComponents";
import UserListCard from "@/components/home/UserListCard";
import UserListCardPlaceholder from "@/components/home/UserListCardPlaceholder";
const HEADERS = [
  "Name",
  "Albums",
  "Songs",
  "Collaborators",
  "Created At",
  "Privacy",
];

async function getListInfo() {}

async function getUserLists() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  // const { data, error } = await supabase
  //   .from("tierlists")
  //   .select()
  //   .eq("creator_id", user.id);
  const { data, error } = await supabase.rpc("get_lists_and_info");
  console.log(data, error);

  return data;
}

export default async function Account() {
  const userLists = await getUserLists();
  return (
    <>
      {/* <Card className="flex flex-row flex-wrap bg-alt-bg gap-5 p-1.5 justify-center">
        {userLists.map((listItem) => {
          return (
            <Suspense key={listItem.id} fallback={<UserListCardPlaceholder />}>
              <UserListCard list={listItem} />
            </Suspense>
          );
        })}
      </Card> */}
      <Card className="h-full w-full overflow-auto bg-alt-bg">
        <table className="w-full min-w-max table-auto text-left bg-alt-bg text-text">
          <thead>
            <tr>
              {HEADERS.map((head) => (
                <th
                  key={head}
                  className="border-b  border-text bg-alt-bg-darker p-4"
                >
                  <Typography
                    variant="small"
                    className="text-text leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userLists.map((list, index) => {
              const isLast = index === userLists.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-text";
              return (
                <tr key={list.name}>
                  <td className={classes}>
                    <Link href={`/lists/${list.id}`}>
                      <Typography className="underline">{list.name}</Typography>
                    </Link>
                  </td>
                  <td className={classes}>
                    <Typography>{list.albums}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography>{list.songs}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography>{list.collaborators}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography>
                      {new Date(list.created_at).toLocaleString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography>
                      {list.public ? "Public" : "Private"}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
