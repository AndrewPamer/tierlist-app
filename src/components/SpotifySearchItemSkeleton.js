"use client";
import { Typography } from "@material-tailwind/react";
export default function SpotifySearchItemSkeleton() {
  return (
    <div className=" text-left flex items-center overflow-hidden gap-2 p-2 text-text animate-pulse">
      <div className="grid h-14 w-14 place-items-center rounded-lg bg-button-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-8 w-8 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      <div className="w-max">
        <Typography
          as="div"
          variant="h3"
          className=" h-3 mb-2 w-24 rounded-full bg-text"
        >
          &nbsp;
        </Typography>
        <Typography as="div" className=" h-2 w-24 rounded-full bg-button-hover">
          &nbsp;
        </Typography>
      </div>
    </div>
  );
}
