import Image from "next/image";
import getBase64 from "@/utils/images/getBase64";
export default async function ItemImage({ url, alt }) {
  const base64 = await getBase64(url);
  return (
    <div>
      <Image
        className="mb-1 h-14 w-14"
        src={url}
        width={640}
        height={640}
        placeholder="blur"
        blurDataURL={base64}
        alt={alt}
      />
    </div>
  );
}
