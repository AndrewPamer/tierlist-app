"use client";
import { useState, useCallback, useRef } from "react";

import { getAuthContext } from "@/components/context/AuthContextProvider";
import { createClient } from "@/utils/supabase/client";

import { usePathname } from "next/navigation";

import {
  useQuery,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import Link from "next/link";

const navLinks = [
  { title: "Lists", path: "/account" },
  { title: "Friends", path: "/account/friends" },
  { title: "Settings", path: "/account/settings" },
];

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

export default function AccountLayout({ children }) {
  const pathname = usePathname();

  const supabase = createClient();
  const user = getAuthContext();

  const { data, error, isLoading } = useQuery(
    supabase
      .from("profiles")
      .select("username, color")
      .eq("id", user?.id)
      .single(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { trigger: update } = useUpdateMutation(
    supabase.from("profiles"),
    ["id"],
    null,
    {
      onSuccess: () => console.log("SDf"),
    }
  );

  console.log(data, isLoading);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <main>
      <p className="text-sm">
        <Link href="/home" className="p-2 inline-block">
          Go Back
        </Link>
      </p>
      <div className="flex items-center flex-col ">
        <Popover placement="bottom">
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
                    onClick={() => update({ id: user.id, color: color })}
                  ></button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        <h1 className="text-lg font-bold mt-1">{data.username}</h1>
        <form action="/auth/signout" method="post">
          <button className="font-bold bg-button-bg text-button-text text-1xl px-2 py-1 rounded-lg hover:bg-button-hover mt-3">
            Log Out
          </button>
        </form>
      </div>
      <ul className="flex justify-center mt-5 gap-10">
        {navLinks.map((item, i) => {
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
        })}
      </ul>
      {children}
    </main>
  );
}
