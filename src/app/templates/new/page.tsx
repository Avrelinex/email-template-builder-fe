"use client";

import * as React from "react";
import { FormValues } from "../types";
import { CreateTemplateDto } from "@/app/lib/dto/CreateTemplate.dto";
import { ApiClient } from "@/app/lib/apiClient";
import { TemplateForm } from "../components/TemplateForm";

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
    <TemplateForm
      header="Create a new email template"
      successMessage="Template created successfully"
      errorMessage="Failed to create template"
      submitFn={onSubmit}
    />
  );
}
