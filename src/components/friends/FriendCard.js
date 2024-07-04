import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  List,
} from "@material-tailwind/react";

import DialogPopup from "@/components/DialogPopup";

export default function FriendCard({ name, buttons, color, popup = true }) {
  if (!buttons) {
    return;
  }

  return (
    <div className="bg-alt-bg flex justify-between items-center mt-2 p-2 rounded-md		">
      <div className="flex items-center gap-1">
        <div
          className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full"
          style={{ backgroundColor: `#${color}` }}
        >
          {name[0].toUpperCase()}
        </div>
        <h3>{name}</h3>
      </div>

      {popup ? (
        <Popover>
          <PopoverHandler>
            <Button ripple={false}>
              <BsThreeDotsVertical />
            </Button>
          </PopoverHandler>
          <PopoverContent className="p-0 border-none rounded-none	">
            <List className="p-0 gap-0 ">
              {buttons?.map((data, i) => {
                return <DialogPopup data={data} key={i} />;
              })}
            </List>
          </PopoverContent>
        </Popover>
      ) : buttons.length === 1 ? (
        <Button onClick={buttons[0].buttonAction}>
          {buttons[0].buttonTitle}
        </Button>
      ) : (
        <List></List>
      )}

      {/* <Menu>
        <MenuButton className="bg-alt-bg-darker p-1 rounded-full overflow-hidden">
          <BsThreeDotsVertical />
        </MenuButton>
        <MenuItems
          anchor="top"
          className="bg-alt-bg-darker flex-col rounded-lg 	"
        >
          {buttons.map((button, i) => (
            <MenuItem key={i} className="text-xs p-1">
              <button onClick={() => showPopup(button)}>
                {button.buttonTitle}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu> */}
    </div>
  );
}
