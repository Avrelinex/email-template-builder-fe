"use client";

import { ApiClient } from "@/app/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { TemplateDto } from "@/app/lib/dto/template/Template.dto";
import { Grid } from "@mui/material";
import { useState } from "react";
import { Topbar } from "./components/Topbar";

export default function Page({ params }: { params: { id: string } }) {
  const apiClient = ApiClient.getInstance();

  const { data, isLoading, error } = useQuery<TemplateDto, Error>({
    queryKey: ["templates", params.id],
    queryFn: () => apiClient.getTemplateById(params.id),
  });

  const [darkMode, setDarkMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) return <div>{error.message}</div>;

  if (!data) {
    return <div>Template not found</div>;
  }

  return (
    <Grid
      container
      spacing={5}
      height={"100%"}
      flexDirection={"column"}
      margin={0}
    >
      <Grid container display={"flex"}>
        <Topbar
          mobileMode={mobileMode}
          setMobileMode={setMobileMode}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          iframeId={"preview-iframe"}
        />
      </Grid>
      <Grid item xs display={"flex"} flexDirection={"column"}>
        <iframe
          id="preview-iframe"
          srcDoc={data.body}
          style={{
            width: mobileMode ? "350px" : "616px",
            height: "100%",
            border: "none",
          }}
        />
      </Grid>
    </Grid>
  );
}
