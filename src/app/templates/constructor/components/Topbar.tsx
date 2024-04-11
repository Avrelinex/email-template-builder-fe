import { useEditor } from "@craftjs/core";
import {
  Box,
  Grid,
  Button as MaterialButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import { DarkMode } from "../../components/DarkMode";

export const Topbar = ({
  name,
  setName,
  darkMode,
  setDarkMode,
  onSave,
  iframeId,
}: {
  name: string;
  setName: (name: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onSave: () => void;
  iframeId: string;
}) => {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item>
          <DarkMode
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            iframeId={iframeId}
          />
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
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              border: "2px solid",
            }}
          >
            Undo
          </MaterialButton>
          <MaterialButton
            size="small"
            variant="outlined"
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              border: "2px solid",
            }}
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
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              border: "2px solid",
            }}
          >
            Save
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
