"use client";

import { ApiClient } from "@/app/lib/apiClient";
import { CreateImageDto } from "@/app/lib/dto/image/CreateImage.dto";
import { Box } from "@mui/material";
import * as React from "react";
import { ImageCreateForm } from "../components/ImageCreateForm";
import { CreateFormValues } from "../types";

export default function Page() {
  const apiClient = ApiClient.getInstance();

  const onSubmit = async (formData: CreateFormValues) => {
    const requestImageBody: CreateImageDto = {
      displayName: formData.displayName,
      file: formData.file,
    };

    await apiClient.createImage(requestImageBody);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ImageCreateForm
        header="Upload a new image"
        successMessage="Image uploaded successfully"
        errorMessage="Failed to upload image"
        submitFn={onSubmit}
      />
    </Box>
  );
}
