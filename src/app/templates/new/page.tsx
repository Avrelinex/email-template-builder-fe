"use client";

import { ApiClient } from "@/app/lib/apiClient";
import { CreateTemplateDto } from "@/app/lib/dto/template/CreateTemplate.dto";
import { Box } from "@mui/material";
import * as React from "react";
import { TemplateForm } from "../components/TemplateForm";
import { FormValues } from "../types";

export default function Page() {
  const apiClient = ApiClient.getInstance();

  const onSubmit = async (formData: FormValues) => {
    const requestTemplateBody: CreateTemplateDto = {
      name: formData.name,
      body: formData.body,
    };

    await apiClient.createTemplate(requestTemplateBody);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TemplateForm
        header="Create a new email template"
        successMessage="Template created successfully"
        errorMessage="Failed to create template"
        submitFn={onSubmit}
      />
    </Box>
  );
}
