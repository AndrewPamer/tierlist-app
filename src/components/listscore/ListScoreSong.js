import {
  Menu,
  Button,
  MenuHandler,
  MenuList,
  MenuItem,
  ListItem,
} from "@material-tailwind/react";
import useGetSpotifySong from "@/hooks/useGetSpotifySong";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import LoadingSpinner from "../LoadingSpinner";
import useGetSongScore from "@/hooks/useGetSongScore";
import UpdateSongScore from "@/tools/UpdateSongScore";
export default function ListScoreSong({ song }) {
  const { data: spotifyData, isLoading: spotifyLoading } = useGetSpotifySong(
    song.spotify_id
  );

  const { data, isLoading, error, upsert } = useGetSongScore(song.song_id);

  if (spotifyLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ListItem className="p-1 flex justify-between" ripple={false}>
      <SpotifySearchItem item={spotifyData} />

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
                key={i}
                onClick={() =>
                  UpdateSongScore({ song_id: song.song_id, score: i, upsert })
                }
              >
                {i}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </ListItem>
  );
}
