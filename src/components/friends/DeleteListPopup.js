"use client";
import { useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import deleteList from "@/utils/supabase/deleteList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteListPopup({ listID, listName }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <FontAwesomeIcon icon={faTrash} className="text-lg" />
      </IconButton>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Are you sure you want to delete {listName}</DialogHeader>
        <DialogBody>
          This will permanently delete this list for you and any collaborators.
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                const res = await deleteList(listID);
                if (res?.error) {
                  throw new Error(res.error);
                }
              } catch (e) {
                console.error(e);
              } finally {
                handleOpen();
              }
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleOpen}>Cancel</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
