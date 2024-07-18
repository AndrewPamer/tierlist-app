import getBase64 from "@/utils/images/getBase64";
import Image from "next/image";
export default async function BlurImage({
  imageSrc,
  alt,
  width,
  height,
  className,
}) {
  const blurImageUrl = await getBase64(imageSrc);
  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      placeholder="blur"
      blurDataURL={blurImageUrl}
    />
  );
}
