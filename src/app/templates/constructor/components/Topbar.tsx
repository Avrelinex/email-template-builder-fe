import { useEditor } from "@craftjs/core";
import { Box, Grid, Button as MaterialButton, TextField } from "@mui/material";
import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const Topbar = ({
  name,
  setName,
  onSave,
}: {
  name: string;
  setName: (name: string) => void;
  onSave: () => void;
}) => {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const handleDarkModeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: boolean
  ) => {
    const iframe = document.getElementById(
      "constructor-iframe"
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

  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item>
          <ToggleButtonGroup
            value={darkMode}
            exclusive
            onChange={handleDarkModeChange}
            aria-label="dark mode"
            style={{ marginRight: "10px" }}
          >
            <ToggleButton value={false} aria-label="light mode">
              <Brightness7Icon />
            </ToggleButton>
            <ToggleButton value={true} aria-label="dark mode">
              <Brightness4Icon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs>
          <TextField
            label="Template name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <MaterialButton
            size="small"
            variant="outlined"
            color="secondary"
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
            style={{ marginRight: "10px" }}
          >
            Undo
          </MaterialButton>
          <MaterialButton
            size="small"
            variant="outlined"
            color="secondary"
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
            style={{ marginRight: "10px" }}
          >
            Redo
          </MaterialButton>
        </Grid>
        <Grid item>
          <MaterialButton
            size="small"
            variant="outlined"
            color="secondary"
            onClick={onSave}
            style={{ marginRight: "10px" }}
          >
            Save
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
