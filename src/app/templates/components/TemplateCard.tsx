import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import * as React from "react";

export type TemplateCardProps = {
  name: string;
  body: string;
};

export const TemplateCard: React.FC<TemplateCardProps> = ({ name, body }) => {
  return (
    <Card
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "none",
        w: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ m: "1rem auto" }}>
          {name}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <ButtonGroup sx={{ mx: "auto" }}>
            <IconButton>
              <Delete />
            </IconButton>
            <IconButton>
              <Edit />
            </IconButton>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
};
