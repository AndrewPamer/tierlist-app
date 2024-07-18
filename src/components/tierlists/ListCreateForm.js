"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Input,
  Typography,
  Radio,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { getListContext } from "../context/ListContextProvider";
import { getCollabContext } from "../context/CollabContextProvider";
import { useForm } from "react-hook-form";
import addTierList from "@/utils/supabase/addTierlist";
export default function ListCreateForm({ children }) {
  const { list } = getListContext();
  const { collabs } = getCollabContext();
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm();

  async function onSubmit(data) {
    setDisabled(true);
    try {
      const formattedAlbums = list?.albums?.map((album) => {
        return album.id;
      });
      const formattedSongs = list?.songs?.map((song) => {
        return song.id;
      });
      const formattedCollabs = collabs?.map((collab) => {
        return collab.friend_id;
      });
      const formattedData = {
        ...data,
        collabs: formattedCollabs,
        list: { albums: formattedAlbums, songs: formattedSongs },
      };

      const { error } = await addTierList(formattedData);
      if (error) {
        throw error;
      }
    } catch (e) {
      toast.error(`Error creating the list: ${e.message}`);
      setDisabled(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit((d) => onSubmit(d))}
      className="flex flex-col gap-5"
    >
      <div>
        <Typography className="font-bold">Name</Typography>
        <Input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 5, message: "Name is not long enough" },
            maxLength: { value: 50, message: "Name is too long" },
          })}
          className="!border-text focus:!border-text"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography
          variant="small"
          className="mt-1 gap-0.5 flex items-center font-normal text-button-hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.0}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          Use between 5 and 50 characters
        </Typography>
        <Typography className="text-error font-bold">
          {errors.name?.message}
        </Typography>
      </div>
      <div>
        <Typography className="font-bold flex items-center gap-1">
          Visibility
          <Tooltip
            content={
              <div className="w-80">
                <Typography variant="small">
                  A <span className="font-bold">private</span> list is only
                  visible to you and your collaborators.
                </Typography>
                <Typography variant="small">
                  A <span className="font-bold">public</span> list is visible to
                  anyone.
                </Typography>
                <Typography variant="small">
                  In either case, only you and your collaborators can work on
                  the list.
                </Typography>
              </div>
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.0}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </Tooltip>
        </Typography>
        <div className="flex gap-10">
          <Radio
            {...register("visibility")}
            name="visibility"
            value="Public"
            label={<Typography className="text-text">Public</Typography>}
            ripple={false}
          />
          <Radio
            {...register("visibility")}
            name="visibility"
            value="Private"
            label={<Typography className="text-text">Private</Typography>}
            ripple={false}
            defaultChecked
          />
        </div>
      </div>
      {children}
      <Button type="submit" disabled={disabled}>
        {disabled ? "Creating List..." : "Create List"}
      </Button>
    </form>
  );
}
