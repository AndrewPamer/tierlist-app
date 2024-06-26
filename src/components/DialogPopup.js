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

    // <Dialog open={true} onClose={onClose} className="relative z-50">
    //   <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    //   <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
    //     <DialogPanel className="max-w-lg space-y-4 border bg-alt-bg p-10">
    //       <DialogTitle className="font-bold text-xl">{title}</DialogTitle>
    //       <Description>{header}</Description>

    //       <div className="flex gap-4">
    //         <button
    //           onClick={onClose}
    //           className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           onClick={() => {
    //             action();
    //             onClose();
    //           }}
    //           className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover"
    //         >
    //           Confirm
    //         </button>
    //       </div>
    //     </DialogPanel>
    //   </div>
    // </Dialog>
  );
}
