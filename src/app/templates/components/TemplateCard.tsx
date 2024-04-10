import * as React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Dialog } from "@mui/material";
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

export type TemplateCardProps = {
  id: string;
  name: string;
  body: string;
};

export const TemplateCard: React.FC<TemplateCardProps> = ({ name, id }) => {
  const apiClient = ApiClient.getInstance();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => {
      return apiClient.deleteTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      enqueueSnackbar("Template deleted successfully", {
        variant: "success",
        persist: false,
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to delete template", {
        variant: "error",
        persist: false,
      });
    },
  });

  const handleDeleteTemplate = async () => {
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
          {name}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <ButtonGroup>
            <Link href={`/templates/edit/${id}`} passHref>
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
            <IconButton onClick={handleDeleteTemplate}>
              <Delete />
            </IconButton>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
};
