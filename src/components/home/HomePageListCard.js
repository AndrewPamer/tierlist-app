import { Typography, Card, CardBody, CardHeader } from "../TailwindComponents";
import UserListCard from "./UserListCard";

export default function HomePageListCard({ header, lists }) {
  return (
    <Card className="bg-alt-bg text-text">
      <CardHeader
        floated={false}
        className="bg-transparent text-text"
        shadow={false}
      >
        <Typography variant="h5">{header}</Typography>
      </CardHeader>
      <CardBody className=" flex gap-2 overflow-x-auto ">
        {lists.map((listItem) => {
          return <UserListCard key={listItem.id} list={listItem} />;
        })}
      </CardBody>
    </Card>
  );
}
