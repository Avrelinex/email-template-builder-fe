"use client";

import { ApiClient } from "@/app/lib/apiClient";
import { CreateTemplateDto } from "@/app/lib/dto/template/CreateTemplate.dto";
import { Box } from "@mui/material";
import * as React from "react";
import { FormValues } from "../types";
import { Constructor } from "../constructor/components/Constructor";
import { ConstructorWrapper } from "../constructor/components/ConstructorWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function Page() {
  const apiClient = ApiClient.getInstance();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (requestTemplateBody: CreateTemplateDto) => {
      await apiClient.createTemplate(requestTemplateBody);
    },
    onError: (error: Error) => {
      enqueueSnackbar("Failed to create template", { variant: "error" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      enqueueSnackbar("Template created successfully", { variant: "success" });
      router.push("/images");
    },
  });

  const onSave = async (data: FormValues) => {
    const requestTemplateBody: CreateTemplateDto = {
      name: data.name,
      body: data.body,
      state: data.state,
    };

    mutate(requestTemplateBody);
  };

  const data = {
    name: "",
    body: "",
    state: "",
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ConstructorWrapper>
        <Constructor onSave={onSave} templateData={data} />
      </ConstructorWrapper>
    </Box>
  );
}
