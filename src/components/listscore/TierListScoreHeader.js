"use client";
import { Typography, Tooltip, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
export default function TierListScoreHeader({ list, collaborators, isOwner }) {
  const creatorProfile = list.profiles;

  return (
    <header className="mt-5">
      <Typography
        variant="h1"
        className="text-3xl text-center font-bold flex justify-center gap-3"
      >
        {list.name}
        {isOwner && (
          <IconButton>
            <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
          </IconButton>
        )}
      </Typography>
      <section
        className={`flex  mt-3 ${
          collaborators?.length > 0 ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex flex-col gap-1 items-center  p-1 rounded-lg bg-alt-bg">
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
          <div className="flex flex-col gap-1 items-center  p-1 rounded-lg bg-alt-bg">
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
