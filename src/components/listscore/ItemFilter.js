"use client";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@material-tailwind/react";

import useDebounce from "@/hooks/useDebounce";
import ListSearch from "./ListSearch";
export default function ItemFilter({ items, album = true }) {
  const { register, watch } = useForm({ defaultValues: { search: "" } });
  const debouncedSearchText = useDebounce(watch("search"), 333);
  const filterItems = useMemo(() => {
    if (debouncedSearchText === "") {
      return items;
    }
    return items.filter((item) => {
      return item.name
        .toUpperCase()
        .includes(debouncedSearchText.toUpperCase());
    });
  }, [items, debouncedSearchText]);

  return (
    <>
      <form>
        <Input
          {...register("search")}
          label={`Search for ${album ? "an" : "a"} ${album ? "album" : "song"}`}
        />
      </form>
      <ListSearch items={filterItems} album={album} />
    </>
  );
}
