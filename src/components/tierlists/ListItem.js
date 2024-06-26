export default function ListItem({ item, onClick }) {
  return (
    <button
      className="bg-alt-bg p-2 rounded-md text-left flex flex-col"
      onClick={() => onClick(item)}
      key={item.id}
    >
      <img className="mb-1" src={item.images[0].url} width={640} height={640} />
      <h3 className="text-lg font-bold">{item.name}</h3>
      <div>
        {item.artists.map((artist) => {
          return (
            <p className="text-sm" key={artist.id}>
              {artist.name}
            </p>
          );
        })}
      </div>
    </button>
  );
}
