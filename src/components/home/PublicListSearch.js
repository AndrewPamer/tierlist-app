"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import {
  Input,
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import HomePageListCard from "./HomePageListCard";
import LoadingSpinner from "../LoadingSpinner";
export default function PublicListSearch() {
  const supabase = createClient();
  const [search, setSearch] = useState(null);

  function handleSearch(e) {
    if (e.target.value === "") {
      setSearch(null);
    } else {
      setSearch(e.target.value);
    }
  }

  const { data, error, isLoading } = useQuery(
    supabase.rpc("public_list_search", {
      search: search,
    })
  );

  console.log(data, error);

  return (
    <Card className="bg-alt-bg text-text ">
      <CardHeader
        floated={false}
        shadow={false}
        className="bg-transparent text-text"
      >
        <Typography variant="h5" className="font-bold">
          Search for a public list
        </Typography>
      </CardHeader>
      <CardBody>
        <Input label="List Name" onChange={(e) => handleSearch(e)} />
        {isLoading ? (
          <LoadingSpinner />
        ) : data?.length === 0 ? (
          <Typography>No Result</Typography>
        ) : (
          <HomePageListCard header={""} lists={data} />
        )}
      </CardBody>
    </Card>
  );
}
