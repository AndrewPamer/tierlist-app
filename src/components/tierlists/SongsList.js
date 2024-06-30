import useSWR from "swr";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Spinner,
} from "@material-tailwind/react";

async function fetcher([url, token]) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
}

export default function SongList({ albumId, token }) {
  const { data, error, isLoading } = useSWR(
    [`https://api.spotify.com/v1/albums/${albumId}/tracks`, token],
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-4">
        <Spinner className=" h-8 w-8" />
      </div>
    );
  }

  return (
    <List className="bg-alt-bg-darker rounded-md flex flex-col items-start">
      {data?.items?.map((item, i) => {
        return (
          <ListItem className="p-0 " key={i} ripple={false}>
            <label
              htmlFor={item.id}
              className="flex w-full cursor-pointer items-center px-3 py-2 "
            >
              <ListItemPrefix>
                <Checkbox
                  id={item.id}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0 ",
                  }}
                />
              </ListItemPrefix>
              <Typography>{item.name}</Typography>
            </label>
          </ListItem>
        );
      })}
    </List>
  );
}
