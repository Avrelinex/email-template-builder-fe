import { z } from "zod";
import { MAX_FILE_SIZE } from "./constants";
import { ALLOWED_IMAGE_TYPES } from "./constants";

export const getImageSchema = () =>
  z.object({
    displayName: z
      .string()
      .min(3, { message: "Display name should be at least 3 characters long" })
      .max(64, {
        message: "Display name should be at most 64 characters long",
      }),
    image: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, {
        message: `File size should be less than ${MAX_FILE_SIZE} bytes`,
      })
      .refine((file) => ALLOWED_IMAGE_TYPES.includes(file?.type), {
        message: `File type should be one of ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      }),
  });
