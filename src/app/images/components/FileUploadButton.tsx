import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, Control } from "react-hook-form";
import { CreateFormValues } from "../types";

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

export type FileUploadButtonProps = {
  control: Control<CreateFormValues, any>;
};

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  control,
}) => {
  return (
    <Controller
      name="file"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            htmlFor="upload-file"
          >
            Upload file
            <VisuallyHiddenInput
              id="upload-file"
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  field.onChange(e.target.files[0]);
                }
              }}
            />
          </Button>
          <span>{field.value?.name || "No file selected"}</span>
        </>
      )}
    ></Controller>
  );
};
