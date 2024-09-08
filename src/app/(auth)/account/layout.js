import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/friends/Navbar";

import { Button } from "@/components/TailwindComponents";
import AccountUserAvatar from "@/components/friends/AccountUserAvatar";
import BackArrow from "@/components/BackArrow";
import Link from "next/link";

const colors = [
  "000000",
  "0000FF",
  "A52A2A",
  "00FFFF",
  "FFD700",
  "008000",
  "808080",
  "800000",
  "FFA500",
  "FFC0CB",
  "800080",
  "FF0000",
  "FFFF00",
  "0A2815",
  "4f2ad3",
  "ba582a",
];

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
        {/* <Popover placement="bottom">
          <PopoverHandler>
            <button
              className="flex justify-center items-center bg-red-400 w-24 h-24 rounded-full text-4xl"
              style={{ backgroundColor: `#${data.color}` }}
            >
              {data.username[0].toUpperCase()}
            </button>
          </PopoverHandler>
          <PopoverContent className="p-2 bg-alt-bg border-none">
            <div className="grid grid-cols-8 gap-1">
              {colors.map((color, i) => {
                return (
                  <button
                    key={i}
                    style={{ backgroundColor: `#${color}` }}
                    className="p-4 border"
                    // onClick={() => update({ id: user.id, color: color })}
                  ></button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover> */}
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
        {/* {navLinks.map((item, i) => {
          return (
            <li key={i}>
              <Link
                href={item.path}
                className={pathname === item.path ? "font-bold underline" : ""}
              >
                {item.title}
              </Link>
            </li>
          );
        })} */}
        <Navbar />
      </ul>
      {children}
    </main>
  );
}
