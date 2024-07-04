import { Button } from "@material-tailwind/react";

export default function SpotifySearchItem({ item, children }) {
  return (
    <div
      className=" text-left flex items-center  gap-2 p-2"
      key={item.id}
      type="button"
    >
      <img
        className="mb-1 h-14"
        src={item?.images ? item.images[0].url : item.album.images[0].url}
      />
      <div>
        <h3 className="text-md font-bold">{item.name}</h3>
        <div>
          {item.artists.map((artist, i) => {
            return (
              <span className="text-xs" key={artist.id}>
                {artist.name}
                {i !== item.artists.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}
