import Image from "next/image";
export default function SpotifySearchItemClient({ item, children }) {
  return (
    <div
      className=" text-left flex items-center overflow-hidden gap-2 p-2 text-text"
      key={item.id}
      type="button"
    >
      <Image
        className="mb-1 h-14 w-14"
        src={item?.images ? item.images[2].url : item?.album?.images[2]?.url}
        width={64}
        height={64}
        alt={`Cover art for ${item.name}`}
      />
      <div className="overflow-hidden">
        <h3 className=" text-md font-bold text-ellipsis  truncate	">
          {item.name}
        </h3>
        <div className="text-ellipsis  truncate text-button-hover">
          {item.artists.map((artist, i) => {
            return (
              <span className="text-xs " key={artist.id}>
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
