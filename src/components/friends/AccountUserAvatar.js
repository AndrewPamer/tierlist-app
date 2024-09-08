"use client";
import { useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import UpdateProfileColor from "@/tools/UpdateProfileColor";
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
export default function AccountUserAvatar({ user }) {
  const [color, setColor] = useState(user.color);
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <button
          className="flex justify-center items-center bg-red-400 w-24 h-24 rounded-full text-4xl"
          style={{ backgroundColor: `#${color}` }}
        >
          {user.username[0].toUpperCase()}
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
                onClick={async () => {
                  const d = await UpdateProfileColor(color);
                  setColor(d);
                }}
              ></button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
