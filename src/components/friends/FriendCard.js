import { BsThreeDotsVertical } from "react-icons/bs";

export default function FriendCard({ name, children }) {
  return (
    <div className="bg-alt-bg flex justify-between items-center mt-2 p-2 rounded-md		">
      <div className="flex items-center gap-1">
        <div className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full">
          {name[0].toUpperCase()}
        </div>
        <h3>{name}</h3>
      </div>
      {/* {children} */}

      <button className="bg-alt-bg-darker p-1 rounded-full">
        <BsThreeDotsVertical />
      </button>
    </div>
  );
}
