import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function FriendCard({ name, children }) {
  return (
    <div className="bg-alt-bg flex justify-between items-center mt-2 p-2 rounded-md		">
      <div className="flex items-center gap-1">
        <div className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full">
          {name[0].toUpperCase()}
        </div>
        <h3>{name}</h3>
      </div>
      {/* {children} */}

      <Menu>
        <MenuButton className="bg-alt-bg-darker p-1 rounded-full overflow-hidden">
          <BsThreeDotsVertical />
        </MenuButton>
        <MenuItems anchor="top" className="bg-red-500 flex flex-col rounded-lg">
          <MenuItem>
            <button>Test 1</button>
          </MenuItem>
          <MenuItem>
            <button>Test 2</button>
          </MenuItem>
        </MenuItems>
      </Menu>
      {/* <button
        data-dropdown-toggle="dropdown"
        className="bg-alt-bg-darker p-1 rounded-full"
      >
        <BsThreeDotsVertical />
        <div
          id="dropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul>
            <li>Test</li>
            <li>Test 2</li>
          </ul>
        </div>
      </button> */}
    </div>
  );
}
