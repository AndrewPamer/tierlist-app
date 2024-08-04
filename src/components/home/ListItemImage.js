// "use client";
// import useGetCoverArt from "@/hooks/useGetCoverArt";
import getSpotifyToken from "@/tools/getSpotifyToken";
// import Image from "next/image";
import BlurImage from "../BlurImage";
async function getCoverArt({ type, id }) {
  const { access_token } = await getSpotifyToken();
  const res = await fetch(`https://api.spotify.com/v1/${type}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
}
export default async function ListItemImage({ item, className }) {
  const data = await getCoverArt({ type: item.type, id: item.id });
  // const { data, error, isLoading } = useGetCoverArt({
  //   ID: item.id,
  //   type: item.type,
  // });
  // if (isLoading) {
  //   return;
  // }
  const imageSrcs = item.type === "tracks" ? data?.album?.images : data?.images;
  return (
    <BlurImage
      imageSrc={imageSrcs[0].url}
      width={640}
      height={640}
      alt={`Album cover for ${data.name}`}
      className={`${className} w-full h-auto`}
    />
    // <Image
    //   src={imageSrcs[0].url}
    //   width={640}
    //   height={640}
    //   alt={`Album cover for ${data.name}`}
    //   className={`${className} w-full h-auto`}
    // />
  );
}
