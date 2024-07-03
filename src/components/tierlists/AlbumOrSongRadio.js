import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import { useId } from "react";

export default function AlbumOrSongRadio({ albumClick, songClick }) {
  const newID = useId();
  return (
    <Card className="">
      <List className="bg-alt-bg-darker rounded-md  flex-row">
        <ListItem className="p-0" ripple={false}>
          <label
            htmlFor={`albums-${newID}`}
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="horizontal-list"
                id={`albums-${newID}`}
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0 ",
                }}
                defaultChecked
                onClick={albumClick}
              />
            </ListItemPrefix>
            <Typography>Albums</Typography>
          </label>
        </ListItem>
        <ListItem className="p-0" ripple={false}>
          <label
            htmlFor={`songs-${newID}`}
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="horizontal-list"
                id={`songs-${newID}`}
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0 ",
                }}
                onClick={songClick}
              />
            </ListItemPrefix>
            <Typography>Songs</Typography>
          </label>
        </ListItem>
      </List>
    </Card>
  );
}
