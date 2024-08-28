"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
const navLinks = [
  { title: "Lists", path: "/account" },
  { title: "Friends", path: "/account/friends" },
  { title: "Settings", path: "/account/settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
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
    </>
  );
}
