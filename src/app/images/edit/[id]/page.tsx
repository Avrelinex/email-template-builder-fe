"use client";

import { ApiClient } from "@/app/lib/apiClient";
import { ImageDto } from "@/app/lib/dto/image/Image.dto";
import { UpdateImageDto } from "@/app/lib/dto/image/UpdateImage.dto";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { ImageForm } from "../../components/ImageForm";
import { FormValues } from "../../types";

export default function Page({ params }: { params: { id: string } }) {
  const apiClient = ApiClient.getInstance();

  //This is not going to work as api returns a file instead of image data (we should do two separate api endpoints, one for image file and one for metadata)
  const { data, isLoading, error } = useQuery<ImageDto, Error>({
    queryKey: ["images", params.id],
    queryFn: () => apiClient.getImageById(params.id),
  });

  const onSubmit = async (formData: FormValues) => {
    const requestImageBody: UpdateImageDto = {
      displayName: formData.displayName,
    };

    await apiClient.updateImage(params.id, requestImageBody);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ImageForm
        defaultValues={data}
        header="Edit Image"
        successMessage="Image updated successfully"
        errorMessage="Failed to update image"
        submitFn={onSubmit}
      />
    </Box>
  );
}
