"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LightMode, DarkMode as DarkModeIcon } from "@mui/icons-material";

export const DarkMode = ({
  darkMode,
  setDarkMode,
  iframeId,
}: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  iframeId: string;
}) => {
  const handleDarkModeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: boolean
  ) => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    const doc = iframe.contentWindow?.document;

    setDarkMode(value);

    if (!doc) {
      return;
    }

    const styleElement =
      doc.querySelector("style") ||
      doc.head.appendChild(doc.createElement("style"));

    styleElement.innerHTML = `
      body {
        filter: ${value ? "invert(1)" : "none"};
      }
      img {
        filter: ${value ? "invert(1)" : "none"};
      }
    `;
  };

  return (
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
        <DarkModeIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
