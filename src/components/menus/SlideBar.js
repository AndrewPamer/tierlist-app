import { Transition } from "@headlessui/react";
import Link from "next/link";
import useClickOutside from "@/hooks/useClickOutside";

export default function SlideBar({ open, setOpen }) {
  const slideRef = useClickOutside(() => setOpen((prevOpen) => !prevOpen));

  return (
    <aside
      className={`absolute transition-all duration-1000 top-0  z-10 ${
        open ? "-right-80" : "right-0"
      }`}
      ref={slideRef}
    >
      <nav className="flex flex-col bg-red-400">
        <Link href="/">Go Home</Link>
        <Link href="/">Go Home</Link>
        <Link href="/">Go Home</Link>
        <Link href="/">Go Home</Link>
        <Link href="/">Go Home</Link>
      </nav>
    </aside>
  );
}
