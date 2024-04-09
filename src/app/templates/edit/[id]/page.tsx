"use client";

import * as React from "react";
import { FormValues } from "../../types";
import { ApiClient } from "@/app/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { TemplateDto } from "@/app/lib/dto/Template.dto";
import { TemplateForm } from "../../components/TemplateForm";
import { UpdateTemplateDto } from "@/app/lib/dto/UpdateTemplate.dto";
import { Box } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  const apiClient = ApiClient.getInstance();

  const { data, isLoading, error } = useQuery<TemplateDto, Error>({
    queryKey: ["templates", params.id],
    queryFn: () => apiClient.getTemplateById(params.id),
  });

  const onSubmit = async (formData: FormValues) => {
    const requestTemplateBody: UpdateTemplateDto = {
      name: formData.name,
      body: formData.body,
    };

    await apiClient.updateTemplate(params.id, requestTemplateBody);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TemplateForm
        defaultValues={data}
        header="Edit Template"
        successMessage="Template updated successfully"
        errorMessage="Failed to update template"
        submitFn={onSubmit}
      />
    </Box>
  );
}
