import UserListCard from "./UserListCard";

export default function PublicListSearchItems({ lists }) {
  return (
    <>
      {lists.map((listItem) => {
        return <UserListCard key={listItem.id} list={listItem} />;
      })}
    </>
  );
}
