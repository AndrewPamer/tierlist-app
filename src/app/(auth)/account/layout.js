import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/friends/Navbar";

import { Button } from "@/components/TailwindComponents";
import AccountUserAvatar from "@/components/friends/AccountUserAvatar";
import BackArrow from "@/components/BackArrow";

async function getUserInfo() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("username, color")
    .eq("id", user?.id)
    .single();
  return data;
}

export default async function AccountLayout({ children }) {
  const data = await getUserInfo();

  return (
    <main>
      <p className="text-sm">
        <BackArrow backhref={"/home"} />
      </p>
      <div className="flex items-center flex-col ">
        <AccountUserAvatar user={data} />

        <h1 className="text-lg font-bold mt-1">{data.username}</h1>
        <form action="/auth/signout" method="post">
          <Button
            type="submit"
            className="text-sm   px-4 py-2 rounded-lg hover:bg-button-hover mt-3"
          >
            Log Out
          </Button>
        </form>
      </div>
      <ul className="flex justify-center mt-5 gap-10 mb-5">
        <Navbar />
      </ul>
      {children}
    </main>
  );
}
