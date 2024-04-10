import * as React from "react";
import { Skeleton } from "@mui/material";

export const ImageCardSkeleton: React.FC = () => {
  return (
    <Skeleton
      variant="rounded"
      width={"300px"}
      height={"250px"}
      sx={{ mr: "1rem" }}
    />
  );
};
