/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { ApiClient } from "../../lib/apiClient";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export type ImageCardProps = {
  id: string;
  displayName: string;
};

export const ImageCard: React.FC<ImageCardProps> = ({ id, displayName }) => {
  const apiClient = ApiClient.getInstance();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => {
      return apiClient.deleteImage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      enqueueSnackbar("Image deleted successfully", {
        variant: "success",
        persist: false,
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to delete image", {
        variant: "error",
        persist: false,
      });
    },
  });

  const handleDeleteImage = async () => {
    try {
      await deleteMutation.mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "none",
        width: "100%",
        maxWidth: "300px",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        alignContent: "space-between",
        mr: "1rem",
        pb: "1rem",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{ ml: "8px", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {displayName}
          </Typography>
          <ButtonGroup sx={{ mb: "5px" }}>
            <Link href={`/images/edit/${id}`} passHref>
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
            <IconButton onClick={handleDeleteImage}>
              <Delete />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            height: "180px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={`http://localhost:3000/images/${id}`}
            alt={displayName}
            style={{ objectFit: "contain", maxHeight: "100%" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
