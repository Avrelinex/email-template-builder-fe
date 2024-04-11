import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

export type FeatureCardProps = {
  Icon: React.ElementType;
  link: string;
  label: string;
  description: string;
  buttonText: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  link,
  label,
  description,
  buttonText,
}) => {
  return (
    <Card
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "none",
        mr: "2rem",
        width: "50%",
      }}
    >
      <CardContent sx={{ display: "flex" }}>
        <Icon sx={{ mr: "1rem" }} fontSize="large" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" sx={{ mb: "1rem" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "14px", height: "3rem", mb: "1rem" }}>
            {description}
          </Typography>
          <CardActions>
            <Link href={link} passHref>
              <Button variant="contained" sx={{ m: 0 }} LinkComponent="a">
                {buttonText}
              </Button>
            </Link>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};
