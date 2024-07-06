import Image from "next/image";
export default function SpotifySearchItem({ item, children }) {
  return (
    <div
      className=" text-left flex items-center overflow-hidden gap-2 p-2 "
      key={item.id}
      type="button"
    >
      <Image
        className="mb-1 h-14 w-14"
        src={item?.images ? item.images[0].url : item.album.images[0].url}
        width={640}
        height={640}
        alt={`Cover art for ${item.name}`}
      />
      <div className="overflow-hidden">
        <h3 className="  text-md font-bold text-ellipsis  truncate	">
          {item.name}
        </h3>
        <div className="text-ellipsis  truncate">
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
