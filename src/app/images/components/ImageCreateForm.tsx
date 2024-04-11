"use client";

import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Paper,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCreateImageSchema } from "../schema";
import { CreateFormValues, SubmitFormState } from "../types";
import { Save } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { FileUploadButton } from "./FileUploadButton";

export const ImageCreateForm = ({
  defaultValues,
  header,
  successMessage,
  errorMessage,
  submitFn,
}: {
  defaultValues?: CreateFormValues;
  header: string;
  successMessage: string;
  errorMessage: string;
  submitFn: (data: CreateFormValues) => Promise<void>;
}) => {
  const router = useRouter();
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
    control,
    formState: { errors },
  } = useForm<CreateFormValues>({
    mode: "onChange",
    resolver: zodResolver(getCreateImageSchema()),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CreateFormValues> = async (
    formData: CreateFormValues
  ) => {
    try {
      setDisableForm(true);

      await submitFn(formData);

      router.push("/images");

      enqueueSnackbar(successMessage, {
        variant: "success",
        persist: false,
      });
    } catch (error: unknown) {
      setSubmitFormState({
        submitting: false,
        submitted: false,
        error: error as Error,
      });

      enqueueSnackbar(errorMessage, {
        variant: "error",
        persist: false,
      });
    } finally {
      setDisableForm(false);
    }
  };

  return (
    <Box>
      <Typography>{header}</Typography>
      <Paper sx={{ p: "1rem", mt: "2rem" }}>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Display name"
            error={!!errors.displayName}
            helperText={
              errors.displayName
                ? errors.displayName.message
                : "Name of your image"
            }
            {...register("displayName")}
            disabled={disableForm}
            sx={{ mb: "1rem" }}
          />
          {errors.file && (
            <Typography sx={{ color: "red", fontSize: "14px" }}>
              {errors.file.message}
            </Typography>
          )}
          <FileUploadButton control={control} />
          <Button
            sx={{
              mt: "1rem",
            }}
            color="primary"
            type="submit"
            disabled={disableForm}
            variant="contained"
            startIcon={<Save />}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
