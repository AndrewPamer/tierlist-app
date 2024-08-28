"use client";
import { useState } from "react";
import {
  Card,
  Switch,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
export default function Settings() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <Card className="bg-alt-bg p-5">
      {/* <Switch
        label="Toggle Dark Mode"
        ripple={false}
        labelProps={{
          className: "text-text",
        }}
        circleProps={{
          className: "before:hidden   bg-text",
        }}
        onChange={() => console.log("D")}
      /> */}
      <Button onClick={handleOpen}>Delete Account</Button>
      <Dialog open={open} handler={setOpen}>
        <DialogHeader>
          Are you sure you want to delete your account?
        </DialogHeader>
        <DialogBody>
          This will delete all your lists and all your scores. This cannot be
          undone.
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button variant="outlined">Confirm</Button>
          <Button onClick={handleOpen}>Cancel</Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
