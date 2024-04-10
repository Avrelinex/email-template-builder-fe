"use client";

import * as React from "react";
import { Box, Typography, List } from "@mui/material";
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
    return <ImageCardSkeleton />;
  }

  if (error) {
    enqueueSnackbar("Failed to load templates", {
      variant: "error",
      persist: false,
    });
  }

  return (
    <Box>
      <Typography variant="h4">Images</Typography>
      <List>
        {data?.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            fileName={image.fileName}
            displayName={image.displayName}
          />
        ))}
      </List>
    </Box>
  );
}
