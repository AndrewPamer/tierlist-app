"use server";
import { createClient } from "./server";
import { redirect } from "next/navigation";
export default async function addTierList(tierlistData) {
  const supabase = createClient();
  let redirectPath = "";
  try {
    if (
      (tierlistData.list?.songs?.length ?? 0) === 0 &&
      (tierlistData.list?.albums?.length ?? 0) === 0
    ) {
      throw new Error("A list must contain at least one album or song");
    }
    const {
      data: {
        user: { id },
      },
    } = await supabase.auth.getUser();
    //1. Add the tier list
    const { data, error } = await supabase
      .from("tierlists")
      .insert({
        creator_id: id,
        name: tierlistData.name,
      })
      .select();
    if (error) {
      throw error;
    }
    const listID = data[0].id;
    //2. Set the privacy
    const { error: privacyError } = await supabase.from("listprivacy").insert({
      list_id: listID,
      public: tierlistData.visibility === "Public",
    });
    if (privacyError) {
      throw privacyError;
    }
    //2. Add the collaborators
    if (tierlistData.collabs.length > 0) {
      const { error } = await supabase.from("listcollaborators").insert(
        tierlistData.collabs.map((collab) => {
          return {
            list_id: listID,
            collaborator_id: collab,
          };
        })
      );
    }
    if (error) {
      throw error;
    }
    //3. Add the songs
    if (tierlistData.list?.songs?.length > 0) {
      const { error } = await supabase.from("listsongs").insert(
        tierlistData.list.songs.map((song, i) => {
          return {
            list_id: listID,
            spotify_id: song,
            order: i,
          };
        })
      );
    }
    if (error) {
      throw error;
    }

    //4. Add the albums
    if (tierlistData.list?.albums?.length > 0) {
      const { error } = await supabase.from("listalbums").insert(
        tierlistData.list.albums.map((album, i) => {
          return {
            list_id: listID,
            spotify_id: album,
            order: i,
          };
        })
      );
    }
    if (error) {
      throw error;
    }
    redirectPath = `/lists/${listID}`;
  } catch (e) {
    return { error: { message: e.message } };
  }
  redirect(redirectPath);
}
