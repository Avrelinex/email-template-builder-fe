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
import { getImageSchema } from "../schema";
import { FormValues, SubmitFormState } from "../types";
import { Save } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { FileUploadButton } from "./FileUploadButton";

export const ImageForm = ({
  defaultValues,
  header,
  successMessage,
  errorMessage,
  submitFn,
}: {
  defaultValues?: FormValues;
  header: string;
  successMessage: string;
  errorMessage: string;
  submitFn: (data: FormValues) => Promise<void>;
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
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(getImageSchema()),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData: FormValues) => {
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
            label="Template name"
            error={!!errors.displayName}
            helperText={
              errors.displayName ? (
                <Typography sx={{ color: "red", fontSize: "14px" }}>
                  {errors.displayName.message}
                </Typography>
              ) : (
                "Name of your email template"
              )
            }
            {...register("displayName")}
            disabled={disableForm}
            sx={{ mb: "1rem" }}
          />
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
