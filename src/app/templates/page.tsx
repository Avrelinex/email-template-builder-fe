"use client";

import * as React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { ApiClient } from "../lib/apiClient";
import { TemplateDto } from "../lib/dto/Template.dto";
import { useQuery } from "@tanstack/react-query";
import { TemplateCard } from "./components/TemplateCard";

export default function Page() {
  const apiClient = ApiClient.getInstance();

  const { data, isLoading, isError } = useQuery<TemplateDto[], Error>({
    queryKey: ["template"],
    queryFn: () => apiClient.getTemplates(),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) return <div>Error</div>;

  return (
    <>
      <Box>
        <List sx={{ width: "100%" }}>
          {data?.map((template) => (
            <ListItem key={template.id}>
              <TemplateCard name={template.name} body={template.body} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
