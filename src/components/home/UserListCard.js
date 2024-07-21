import { Typography, Card, CardBody, CardHeader } from "../TailwindComponents";
import ListImageCollage from "./ListImageCollage";
import Link from "next/link";

export default async function UserListCard({ list }) {
  return (
    <Link href={`/lists/${list.id}`} className="flex">
      <Card className="bg-alt-bg-darker text-text flex flex-col justify-between h-72	w-52 hover:bg-button-hover hover:text-button-text active:bg-button-hover">
        <CardHeader floated={false} className="bg-transparent">
          <ListImageCollage listID={list.id} />
        </CardHeader>
        <CardBody className=" overflow-hidden ">
          <Typography className="text-lg font-bold text-ellipsis truncate">
            {list.name}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
