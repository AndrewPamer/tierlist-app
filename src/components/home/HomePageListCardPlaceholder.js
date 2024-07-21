"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import UserListCardPlaceholder from "./UserListCardPlaceholder";
export default function HomePageListCardPlaceholder() {
  return (
    <Card className=" animate-pulse bg-alt-bg-darker flex flex-col justify-between">
      <CardHeader shadow={false} floated={false} className="bg-alt-bg">
        <Typography as="div" className=" bg-alt-bg rounded-full ">
          &nbsp;
        </Typography>
      </CardHeader>
      <CardBody>
        <UserListCardPlaceholder />
      </CardBody>
    </Card>
  );
}
