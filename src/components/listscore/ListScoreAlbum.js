"use client";
import useGetSpotifyAlbum from "@/hooks/useGetSpotifyAlbum";
import AlbumAccordion from "../tierlists/AlbumAccordion";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import LoadingSpinner from "../LoadingSpinner";
import ListScoreAlbumBody from "./ListScoreAlbumBody";
export default function ListScoreAlbum({ album }) {
  const { data, isLoading } = useGetSpotifyAlbum(album.spotify_id);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AlbumAccordion
      header={<SpotifySearchItem item={data} />}
      body={<ListScoreAlbumBody album={album} />}
    />
  );
}
