import * as React from "react";
import { Delete, Edit, Email } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  ButtonGroup,
  Divider,
} from "@mui/material";
import { ApiClient } from "../../lib/apiClient";
import Link from "next/link";

export type TemplateCardProps = {
  id: string;
  name: string;
  body: string;
};

export const TemplateCard: React.FC<TemplateCardProps> = ({
  name,
  body,
  id,
}) => {
  const apiClient = ApiClient.getInstance();

  const handleDeleteTemplate = async () => {
    try {
      await apiClient.deleteTemplate(id);
    } catch (error: unknown) {
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
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ ml: "8px" }}>
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
