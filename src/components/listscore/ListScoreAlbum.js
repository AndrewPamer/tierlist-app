"use client";
import useGetSpotifyAlbum from "@/hooks/useGetSpotifyAlbum";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import LoadingSpinner from "../LoadingSpinner";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
export default function ListScoreAlbum({ albumID }) {
  const { data, isLoading } = useGetSpotifyAlbum(albumID);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AlbumAccordion
      header={<SpotifySearchItem item={data} />}
      body={<ListScoreAlbumBody albumID={albumID} />}
    />
  );
}
