import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackArrow({ backhref }) {
  return (
    <Link href={backhref} className=" px-2 py-1 hover:contrast-0">
      <FontAwesomeIcon icon={faCircleLeft} size="xl" />
    </Link>
  );
}
