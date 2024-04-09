"use client";

import * as React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { ApiClient } from "../lib/apiClient";
import { TemplateDto } from "../lib/dto/Template.dto";
import { useQuery } from "@tanstack/react-query";
import { TemplateCard } from "./components/TemplateCard";

export default function Page() {
  const apiClient = ApiClient.getInstance();

  const { data, isLoading, error } = useQuery<TemplateDto[], Error>({
    queryKey: ["templates"],
    queryFn: () => apiClient.getTemplates(),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ w: "100%" }}>
      <List sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        {data?.map((template) => (
          <ListItem key={template.id} sx={{ maxWidth: "250px" }}>
            <TemplateCard
              name={template.name}
              body={template.body}
              id={template.id}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
