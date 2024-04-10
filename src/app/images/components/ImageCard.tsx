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
  fileName: string;
  displayName: string;
};

export const ImageCard: React.FC<ImageCardProps> = ({
  id,
  fileName,
  displayName,
}) => {
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
        height: "130px",
        display: "flex",
        flexDirection: "column",
        alignContent: "space-between",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{ ml: "8px", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {displayName}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <ButtonGroup>
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
      </CardContent>
    </Card>
  );
};
