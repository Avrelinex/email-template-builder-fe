"use client";

import { ApiClient } from "@/app/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { TemplateDto } from "@/app/lib/dto/template/Template.dto";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { LightMode, DarkMode, Computer, Smartphone } from "@mui/icons-material";

export default function Page({ params }: { params: { id: string } }) {
  const apiClient = ApiClient.getInstance();

  const { data, isLoading, error } = useQuery<TemplateDto, Error>({
    queryKey: ["templates", params.id],
    queryFn: () => apiClient.getTemplateById(params.id),
  });

  const [darkMode, setDarkMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  const handleDarkModeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: boolean
  ) => {
    const iframe = document.getElementById(
      "preview-iframe"
    ) as HTMLIFrameElement;
    const doc = iframe.contentWindow?.document;

    setDarkMode(value);

    if (doc) {
      if (value) {
        doc.body.style.filter = "invert(1)";
      } else {
        doc.body.style.filter = "none";
      }
    }
  };

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
        <Grid item>
          <ToggleButtonGroup
            value={darkMode}
            exclusive
            onChange={handleDarkModeChange}
            aria-label="dark mode"
            style={{ marginRight: "10px" }}
          >
            <ToggleButton value={false} aria-label="light mode">
              <LightMode />
            </ToggleButton>
            <ToggleButton value={true} aria-label="dark mode">
              <DarkMode />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={mobileMode}
            exclusive
            onChange={(event, value) => setMobileMode(value)}
            aria-label="mobile mode"
            style={{ marginRight: "10px" }}
          >
            <ToggleButton value={false} aria-label="desktop mode">
              <Computer />
            </ToggleButton>
            <ToggleButton value={true} aria-label="mobile mode">
              <Smartphone />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Grid item xs display={"flex"} flexDirection={"column"}>
        <iframe
          id="preview-iframe"
          srcDoc={data.body}
          style={{
            width: mobileMode ? "350px" : "610px",
            height: "100%",
            border: "1px solid",
          }}
        />
      </Grid>
    </Grid>
  );
}
