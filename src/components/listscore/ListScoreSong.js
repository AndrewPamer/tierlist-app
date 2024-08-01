"use client";
import useGetSpotifySong from "@/hooks/useGetSpotifySong";
import SpotifySearchItem from "../tierlists/SpotifySearchItem";
import LoadingSpinner from "../LoadingSpinner";
export default function ListScoreSong({ songID }) {
  const { data, isLoading } = useGetSpotifySong(songID);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <SpotifySearchItem item={data} />;
}
