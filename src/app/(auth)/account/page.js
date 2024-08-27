import { createClient } from "@/utils/supabase/server";
import { Card, Typography } from "@/components/TailwindComponents";

const HEADERS = [
  "Name",
  "Albums",
  "Songs",
  "Collaborators",
  "Created At",
  "Privacy",
];

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
  console.log(data);
  return data;
}

export default async function Account() {
  const userLists = await getUserLists();
  return (
    <Card className="h-full w-full overflow-scroll mt-5">
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
          {userLists.map((list) => {
            return (
              <tr key={list.name}>
                <td className="p-4">
                  <Typography>{list.name}</Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
