"use client";

import { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  ListItem,
} from "@material-tailwind/react";
export default function DialogPopup({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        ripple={false}
        onClick={() => setOpen(!open)}
        className=" rounded-none font-bold"
      >
        {data.buttonTitle}
      </ListItem>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>{data.popupTitle}</DialogHeader>
        <DialogBody>{data.popupHeader}</DialogBody>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outlined"
            onClick={async () => {
              const k = await data.popupAction();
              setOpen(!open);
            }}
          >
            Confirm
          </Button>
          <Button onClick={() => setOpen(!open)} className="mr-1">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
