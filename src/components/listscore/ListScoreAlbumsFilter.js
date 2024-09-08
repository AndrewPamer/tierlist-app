"use client";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@material-tailwind/react";

import useDebounce from "@/hooks/useDebounce";
import ListSearch from "./ListSearch";
export default function ListScoreAlbumsFilter({ albums }) {
  // const [filterAlbums, setFilterAlbums] = useState(albums);
  const { register, watch } = useForm({ defaultValues: { search: "" } });
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(watch("search"), 333);
  const filterAlbums = useMemo(() => {
    if (debouncedSearchText === "") {
      return albums;
    }
    return albums.filter((album) => {
      return album.name
        .toUpperCase()
        .includes(debouncedSearchText.toUpperCase());
    });
  }, [albums, debouncedSearchText]);
  return (
    <>
      {}
      <form>
        <Input {...register("search")} label="Search for an album" />
      </form>
      <ListSearch albums={filterAlbums} />
    </>
  );
}
