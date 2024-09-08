import { ListContextProvider } from "@/components/context/ListContextProvider";
import { CollabContextProvider } from "@/components/context/CollabContextProvider";
import Link from "next/link";

import AddCollabs from "@/components/collabs/AddCollabs";
import { Typography } from "@/components/TailwindComponents";

import ListCreateForm from "@/components/tierlists/ListCreateForm";

import ListEditPopup from "@/components/tierlists/ListEditPopup";
import SpotifySearchWrapper from "@/components/tierlists/SpotifySearchWrapper";
import BackArrow from "@/components/BackArrow";

export default async function CreatePage() {
  return (
    <main>
      <BackArrow backhref={"/home"} />

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
