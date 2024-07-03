import { Spinner } from "@material-tailwind/react";
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center mt-4">
      <Spinner className=" h-8 w-8" />
    </div>
  );
}
