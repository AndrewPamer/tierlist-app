import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function FriendCard({ name, children }) {
  if (!Array.isArray(children)) {
    children = [children];
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
          {children.map((child, i) => (
            <MenuItem key={i} className="text-xs p-1">
              {child}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
