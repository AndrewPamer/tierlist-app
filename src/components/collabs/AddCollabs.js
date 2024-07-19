"use client";
import {
  Card,
  Typography,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { getCollabContext } from "../context/CollabContextProvider";
import FriendSearch from "../friends/FriendSearch";
export default function AddCollabs() {
  const { collabs, removeCollab, addCollab } = getCollabContext();
  return (
    <div className="flex flex-col ">
      <Typography className="font-bold ">
        Collaborators {collabs.length ? `(${collabs.length} / 10)` : ""}
      </Typography>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {collabs?.map((collab) => {
          return (
            <Card
              key={collab.friend_id}
              className="text-text bg-alt-bg flex items-center p-2 relative"
            >
              <div
                className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full"
                style={{ backgroundColor: `#${collab.color}` }}
              >
                {collab.friend_username[0].toUpperCase()}
              </div>
              <Typography>{collab.friend_username}</Typography>
              <Button
                className="px-2 py-1 text-[0.7rem] mt-2"
                onClick={() => removeCollab(collab)}
              >
                Remove
              </Button>
            </Card>
          );
        })}
        {collabs.length < 10 ? (
          <Popover>
            <PopoverHandler>
              <Button
                type="button"
                className="flex justify-center items-center rounded-full p-0 w-8 h-8"
              >
                +
              </Button>
            </PopoverHandler>
            <PopoverContent className="">
              <FriendSearch addCollab={addCollab} />
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
    </div>
  );
}
