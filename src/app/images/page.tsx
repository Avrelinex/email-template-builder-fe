"use client";

import * as React from "react";
import { Box, List } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../lib/apiClient";
import { ImageCardSkeleton } from "./components/ImageCardSkeleton";
import { enqueueSnackbar } from "notistack";
import { ImageCard } from "./components/ImageCard";

export default function Page() {
  const apiClient = ApiClient.getInstance();

  const { data, isLoading, error } = useQuery({
    queryKey: ["images"],
    queryFn: async () => apiClient.getImages(),
  });

  if (isLoading) {
    return (
      <Box>
        <List sx={{ display: "flex" }}>
          <ImageCardSkeleton />
          <ImageCardSkeleton />
          <ImageCardSkeleton />
        </List>
      </Box>
    );
  }

  if (error) {
    enqueueSnackbar("Failed to load templates", {
      variant: "error",
      persist: false,
    });
  }

  return (
    <Box>
      <List sx={{ display: "flex" }}>
        {data?.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            displayName={image.displayName}
          />
        ))}
      </List>
    </Box>
  );
}
