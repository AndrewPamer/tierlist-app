"use client";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import DialogPopup from "@/components/DialogPopup";

export default function FriendCard({ name, buttons, children }) {
  const [popup, setPopup] = useState(null);

  if (!buttons) {
    return;
  }

  function showPopup({ popupTitle, popupHeader, popupAction }) {
    setPopup(
      <DialogPopup
        onClose={() => setPopup(null)}
        title={popupTitle}
        header={popupHeader}
        action={popupAction}
      />
    );
  }

  return (
    <div className="bg-alt-bg flex justify-between items-center mt-2 p-2 rounded-md		">
      <div className="flex items-center gap-1">
        <div className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full">
          {name[0].toUpperCase()}
        </div>
        <h3>{name}</h3>
      </div>

      <Menu>
        <MenuButton className="bg-alt-bg-darker p-1 rounded-full overflow-hidden">
          <BsThreeDotsVertical />
        </MenuButton>
        <MenuItems
          anchor="top"
          className="bg-alt-bg-darker flex-col rounded-lg 	"
        >
          {buttons.map((button, i) => (
            <MenuItem key={i} className="text-xs p1">
              <button onClick={() => showPopup(button)}>
                {button.buttonTitle}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      {popup}
    </div>
  );
}
