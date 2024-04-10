"use client";

import * as React from "react";
import { FormValues } from "../../types";
import { ApiClient } from "@/app/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TemplateDto } from "@/app/lib/dto/Template.dto";
import { UpdateTemplateDto } from "@/app/lib/dto/UpdateTemplate.dto";
import { Box } from "@mui/material";
import { Constructor } from "../../constructor/components/Constructor";
import { enqueueSnackbar } from "notistack";
import { ConstructorWrapper } from "../../constructor/components/ConstructorWrapper";

export default function Page({ params }: { params: { id: string } }) {
  const apiClient = ApiClient.getInstance();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<TemplateDto, Error>({
    queryKey: ["templates", params.id],
    queryFn: () => apiClient.getTemplateById(params.id),
  });

  const { mutate } = useMutation({
    mutationFn: async (requestTemplateBody: UpdateTemplateDto) => {
      await apiClient.updateTemplate(params.id, requestTemplateBody);
    },
    onError: (error: Error) => {
      enqueueSnackbar("Failed to update template", { variant: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates", params.id] });
      enqueueSnackbar("Template updated successfully", { variant: "success" });
    },
  });

  const onSave = async (data: FormValues) => {
    const requestTemplateBody: UpdateTemplateDto = {
      name: data.name,
      body: data.body,
      state: data.state,
    };

    mutate(requestTemplateBody);
  };

  const defaultValues = {
    name: data?.name ?? "",
    body: data?.body ?? "",
    state: data?.state ?? "",
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ConstructorWrapper>
        <Constructor onSave={onSave} templateData={defaultValues} />
      </ConstructorWrapper>
    </Box>
  );
}
