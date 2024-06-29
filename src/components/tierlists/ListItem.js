export default function ListItem({ item, onClick }) {
  return (
    <div
      className=" text-left flex items-center gap-2"
      //onClick={() => onClick(item)}
      key={item.id}
      type="button"
    >
      <img
        className="mb-1 h-14"
        src={item.images[0].url}
        // width={640}
        // height={640}
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
    </div>
  );
}
