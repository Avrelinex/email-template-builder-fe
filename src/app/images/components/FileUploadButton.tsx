import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, Control } from "react-hook-form";
import { FormValues } from "../types";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type FileUploadButtonProps = {
  control: Control<FormValues, any>;
};

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  control,
}) => {
  return (
    <Controller
      name="image"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                field.onChange(e.target.files[0]);
              }
            }}
          />
        </Button>
      )}
    ></Controller>
  );
};
