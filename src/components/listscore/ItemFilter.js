"use client";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IconButton, Input } from "@material-tailwind/react";

import useDebounce from "@/hooks/useDebounce";
import ListSearch from "./ListSearch";
export default function ItemFilter({ items, album = true, canScore }) {
  const { register, watch } = useForm({ defaultValues: { search: "" } });
  const [filter, setFilter] = useState("");
  const debouncedSearchText = useDebounce(watch("search"), 333);
  const filterItems = useMemo(() => {
    //Nothing
    console.log("Thing");
    if (debouncedSearchText === "" && !filter) {
      console.log("FFF");
      return items;
    }
    let interItems = items;

    //Filter By Search
    if (debouncedSearchText !== "") {
      interItems = interItems.filter((item) => {
        return item.name
          .toUpperCase()
          .includes(debouncedSearchText.toUpperCase());
      });
    }
    //Filter by Completion
    if (filter) {
      console.log("Filter");
      if (filter === "null") {
        interItems = interItems.filter((item) => {
          return item.score === null;
        });
      }
    }

    return interItems;
  }, [items, debouncedSearchText, filter]);

  console.log(items);

  return (
    <>
      <form>
        <Input
          {...register("search")}
          label={`Search for ${album ? "an" : "a"} ${album ? "album" : "song"}`}
        />
        <IconButton
          onClick={(prevFilter) =>
            setFilter(prevFilter === "null" ? "" : "null")
          }
        >
          Filter
        </IconButton>
      </form>
      <ListSearch items={filterItems} album={album} canScore={canScore} />
    </>
  );
}
