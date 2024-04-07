"use client";

import * as React from "react";
import { Box, Typography, TextField, Fab, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTemplateSchema } from "./schema";
import { FormValues, SubmitFormState } from "./types";
import { Save } from "@mui/icons-material";
import { CreateTemplateDto } from "@/app/lib/dto/CreateTemplate.dto";
import { ApiClient } from "@/app/lib/apiClient";

export default function Page() {
  const apiClient = ApiClient.getInstance();
  const [disableForm, setDisableForm] = React.useState<boolean>(false);
  const [submitFormState, setSubmitFormState] = React.useState<SubmitFormState>(
    {
      submitting: false,
      submitted: false,
      error: null,
    }
  );

  const { register, handleSubmit, reset } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(getTemplateSchema()),
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData: FormValues) => {
    const requestTemplateBody: CreateTemplateDto = {
      name: formData.name,
      body: formData.body,
    };

    try {
      setSubmitFormState({
        submitted: false,
        submitting: true,
        error: null,
      });

      await apiClient.createTemplate(requestTemplateBody);

      setSubmitFormState({
        submitting: false,
        submitted: true,
        error: null,
      });
    } catch (error: unknown) {
      setSubmitFormState({
        submitting: false,
        submitted: false,
        error: error as Error,
      });
    }
  };

  return (
    <Box>
      <Typography>Create a new email template</Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          dislay: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Template name"
          helperText="Name of your Email template"
          {...register("name")}
        />
        <TextField
          label="Template body"
          helperText="Body of your Email template"
          {...register("body")}
        />
        <Button
          color="primary"
          type="submit"
          disabled={disableForm}
          startIcon={<Save />}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
