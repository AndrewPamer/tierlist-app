import {
  List,
  ListItem,
  Typography,
  Menu,
  Button,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import useSongsInAlbum from "@/hooks/useSongsInAlbum";
import LoadingSpinner from "../LoadingSpinner";
export default function ListScoreAlbumBody({ albumID }) {
  const { data, isLoading } = useSongsInAlbum(albumID);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {data?.items?.map((item, i) => {
        return (
          <ListItem className="p-1 flex justify-between" key={i} ripple={false}>
            <Typography>{item.name}</Typography>
            <Menu>
              <MenuHandler>
                <Button className="p-2  ">Score</Button>
              </MenuHandler>
              <MenuList className="max-h-72">
                {Array.from({ length: 20 }).map((_, i) => {
                  return <MenuItem>{i + 1}</MenuItem>;
                })}
              </MenuList>
            </Menu>
          </ListItem>
        );
      })}
    </List>
  );
}
