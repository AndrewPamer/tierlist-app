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
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => data.popupAction()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
