"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Computer, Smartphone } from "@mui/icons-material";

export const MobileMode = ({
  mobileMode,
  setMobileMode,
}: {
  mobileMode: boolean;
  setMobileMode: (value: boolean) => void;
}) => {
  return (
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
  );
};
