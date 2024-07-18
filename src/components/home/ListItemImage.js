"use client";
import useGetCoverArt from "@/hooks/useGetCoverArt";
import Image from "next/image";
export default function ListItemImage({ item, token, className }) {
  const { data, error, isLoading } = useGetCoverArt({
    ID: item.id,
    type: item.type,
    token: token.access_token,
  });
  if (isLoading) {
    return;
  }
  const imageSrcs = item.type === "tracks" ? data?.album?.images : data?.images;
  return (
    <Image
      src={imageSrcs[0].url}
      width={640}
      height={640}
      alt={`Album cover for ${data.name}`}
      className={`${className} w-full h-auto`}
    />
  );
}
