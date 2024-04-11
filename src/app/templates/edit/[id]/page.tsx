"use client";

import { ApiClient } from "@/app/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TemplateDto } from "@/app/lib/dto/template/Template.dto";
import { UpdateTemplateDto } from "@/app/lib/dto/template/UpdateTemplate.dto";
import { Box } from "@mui/material";
import { Constructor } from "../../constructor/components/Constructor";
import { enqueueSnackbar } from "notistack";
import { ConstructorWrapper } from "../../constructor/components/ConstructorWrapper";
import { FormValues } from "../../types";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const apiClient = ApiClient.getInstance();
  const queryClient = useQueryClient();
  const router = useRouter();

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
      router.push("/templates");
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

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) return <div>{error.message}</div>;

  if (!data) {
    return <div>Template not found</div>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ConstructorWrapper>
        <Constructor onSave={onSave} templateData={data} />
      </ConstructorWrapper>
    </Box>
  );
}
