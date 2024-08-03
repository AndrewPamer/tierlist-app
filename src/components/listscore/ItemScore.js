import {
  Menu,
  Button,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import LoadingSpinner from "../LoadingSpinner";
import useGetAlbumSongScore from "@/hooks/useGetAlbumSongScore";
import UpdateAlbumSongScore from "@/tools/UpdateAlbumSongScore";
export default function ItemScore({ albumID, songID }) {
  const { data, isLoading, error, upsert } = useGetAlbumSongScore({
    album_id: albumID,
    spotify_id: songID,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Menu>
      <MenuHandler>
        <Button className="p-1.5 w-16">
          {data?.length ? data[0].score : "Score"}
        </Button>
      </MenuHandler>
      <MenuList className="max-h-72 bg-alt-bg text-text border-text">
        {Array.from({ length: 21 }).map((_, i) => {
          return (
            <MenuItem
              onClick={() =>
                UpdateAlbumSongScore({
                  album_id: albumID,
                  spotify_id: songID,
                  score: i,
                  upsert,
                })
              }
              key={i}
            >
              {i}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
