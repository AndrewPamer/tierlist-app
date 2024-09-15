"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import publicListSearch from "@/tools/publicListSearch";
import LoadingSpinner from "../LoadingSpinner";
export default function PublicListSearch() {
  const [firstSearch, setFirstSearch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const { register, handleSubmit } = useForm();

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
        <form
          onSubmit={handleSubmit(async (data) => {
            if (data.search !== "") {
              try {
                setLoading(true);
                const listSearchData = await publicListSearch(data.search);
                setSearchData(listSearchData);
              } catch (e) {
                console.error(e);
              } finally {
                setLoading(false);
                setFirstSearch(false);
              }
            }
          })}
          className="flex gap-2"
        >
          <Input label="List Name" {...register("search")} />
          <IconButton type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
          </IconButton>
        </form>
        {loading ? (
          <LoadingSpinner />
        ) : searchData?.length === 0 && !firstSearch ? (
          <Typography>No Results</Typography>
        ) : firstSearch ? (
          <></>
        ) : (
          <div>{searchData.map((searchList) => {})}</div>
        )}
      </CardBody>
    </Card>
  );
}
