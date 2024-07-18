"use client";
import { Spinner } from "@material-tailwind/react";
export default function LoadingSpinner({ children }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <Spinner className=" h-8 w-8" />
      {children}
    </div>
  );
}
