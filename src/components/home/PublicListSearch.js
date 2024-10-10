"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Input,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
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
          <div className="flex gap-2 overflow-x-auto lg:flex-wrap mt-5">
            {searchData.map((searchList, i) => {
              console.log(searchList);
              return (
                <Link href={`/lists/${searchList.list.id}`}>
                  <Card
                    key={i}
                    className="bg-alt-bg-darker text-text flex flex-col justify-between h-72	w-52 hover:bg-button-hover hover:text-button-text active:bg-button-hover"
                  >
                    <CardHeader
                      floated={false}
                      className="grid grid-cols-2 grid-rows-2  "
                    >
                      {searchList.imageItems.map((image) => {
                        return (
                          <Image
                            src={image[0].url}
                            alt="Cover Art"
                            width={image[0].width}
                            height={image[0].height}
                            className={
                              searchList.imageItems.length === 1
                                ? "row-span-2 col-span-2"
                                : ""
                            }
                          />
                        );
                      })}
                    </CardHeader>
                    <CardBody className=" overflow-hidden ">
                      <div className="inline-block p-1 rounded-lg bg-alt-bg">
                        <Tooltip content={searchList.list.creator_name}>
                          <div
                            className="flex justify-center items-center bg-red-400 w-8 h-8 rounded-full border"
                            style={{
                              backgroundColor: `#${searchList.list.creator_color}`,
                            }}
                          >
                            {searchList.list.creator_name[0].toUpperCase()}
                          </div>
                        </Tooltip>
                      </div>
                      <Typography className="text-lg font-bold text-ellipsis truncate">
                        {searchList.list.name}
                      </Typography>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
