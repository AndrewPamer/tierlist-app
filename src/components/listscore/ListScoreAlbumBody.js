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
import ItemScore from "./ItemScore";
import useSongsInAlbum from "@/hooks/useSongsInAlbum";
import LoadingSpinner from "../LoadingSpinner";
export default function ListScoreAlbumBody({ album }) {
  const { data, isLoading } = useSongsInAlbum(album.spotify_id);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {data?.items?.map((item, i) => {
        return (
          <ListItem className="p-1 flex justify-between" key={i} ripple={false}>
            <Typography>{item.name}</Typography>
            <ItemScore albumID={album.album_id} songID={item.id} />
          </ListItem>
        );
      })}
    </List>
  );
}
