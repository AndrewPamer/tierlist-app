import { ListContextProvider } from "@/components/context/ListContextProvider";
import { CollabContextProvider } from "@/components/context/CollabContextProvider";
import Link from "next/link";

import AddCollabs from "@/components/collabs/AddCollabs";
import { Typography } from "@/components/TailwindComponents";

import ListCreateForm from "@/components/tierlists/ListCreateForm";

import ListEditPopup from "@/components/tierlists/ListEditPopup";
import SpotifySearchWrapper from "@/components/tierlists/SpotifySearchWrapper";

export default async function CreatePage() {
  return (
    <main>
      <Link href="/home" className=" px-2 py-1 hover:underline">
        Back to Home
      </Link>
      <Typography variant="h1" className="text-3xl text-center">
        Create a new List
      </Typography>
      <ListContextProvider>
        <CollabContextProvider>
          <ListCreateForm>
            <AddCollabs />
            <ListEditPopup />
            <SpotifySearchWrapper />
          </ListCreateForm>
        </CollabContextProvider>
      </ListContextProvider>
    </main>
  );
}
