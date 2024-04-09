import { z } from "zod";

export const getTemplateSchema = () => {
  return z.object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters long" })
      .max(64, { message: "Name should be at most 64 characters long" }),
    body: z.string(),
  });
};
