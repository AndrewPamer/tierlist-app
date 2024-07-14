"use client";
import { Typography, Tooltip } from "@material-tailwind/react";
export default function TierListScoreHeader({ list, collaborators }) {
  const creatorProfile = list.profiles;
  return (
    <header className="mt-5">
      <Typography variant="h1" className="text-3xl text-center font-bold">
        {list.name}
      </Typography>
      <section
        className={`flex  mt-3 ${
          collaborators?.length > 0 ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex flex-col gap-1 items-center border p-1 rounded-lg bg-alt-bg">
          <Tooltip content={creatorProfile.username}>
            <div
              className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full border"
              style={{ backgroundColor: `#${creatorProfile.color}` }}
            >
              {creatorProfile.username[0].toUpperCase()}
            </div>
          </Tooltip>
          <Typography variant="small">Creator</Typography>
        </div>
        {collaborators?.length > 0 && (
          <div className="flex flex-col gap-1 items-center border p-1 rounded-lg bg-alt-bg">
            <div className="flex items-center -space-x-2  ">
              {collaborators.map((collab) => {
                const user = collab.profiles;
                return (
                  <Tooltip content={user.username} key={user.id}>
                    <div
                      className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full border"
                      style={{ backgroundColor: `#${user.color}` }}
                    >
                      {user.username[0].toUpperCase()}
                    </div>
                  </Tooltip>
                );
              })}
            </div>
            <Typography variant="small">Collaborators</Typography>
          </div>
        )}
      </section>
    </header>
  );
}
