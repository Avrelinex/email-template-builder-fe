"use client";

import * as React from "react";
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTemplateSchema } from "./schema";
import { FormValues, SubmitFormState } from "./types";
import { Save } from "@mui/icons-material";
import { CreateTemplateDto } from "@/app/lib/dto/CreateTemplate.dto";
import { ApiClient } from "@/app/lib/apiClient";
import { enqueueSnackbar } from "notistack";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(getTemplateSchema()),
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData: FormValues) => {
    const requestTemplateBody: CreateTemplateDto = {
      name: formData.name,
      body: formData.body,
    };

    try {
      setDisableForm(true);

      await apiClient.createTemplate(requestTemplateBody);

      enqueueSnackbar("Template created successfully", {
        variant: "success",
        persist: false,
      });

      setDisableForm(false);
    } catch (error: unknown) {
      setSubmitFormState({
        submitting: false,
        submitted: false,
        error: error as Error,
      });

      enqueueSnackbar("Failed to create template", {
        variant: "error",
        persist: false,
      });
    } finally {
      setDisableForm(false);
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
          error={!!errors.name}
          helperText={
            errors.name ? (
              <Typography sx={{ color: "red", fontSize: "14px" }}>
                {errors.name.message}
              </Typography>
            ) : (
              "Name of your email template"
            )
          }
          {...register("name")}
          disabled={disableForm}
        />
        <TextField
          label="Template body"
          helperText={
            errors.body ? (
              <Typography sx={{ color: "red", fontSize: "14px" }}>
                {errors.body.message}
              </Typography>
            ) : (
              "Body of your email template"
            )
          }
          {...register("body")}
          multiline
          minRows={3}
          disabled={disableForm}
        />
        <Button
          color="primary"
          type="submit"
          disabled={disableForm}
          variant="contained"
          startIcon={<Save />}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
