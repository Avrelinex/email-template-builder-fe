"use client";

import { Frame, Element, useEditor } from "@craftjs/core";
import { Paper, Grid } from "@mui/material";
import React, { useEffect } from "react";

import { SettingsPanel } from "./SettingsPanel";
import { Toolbox } from "./Toolbox";
import { Topbar } from "./Topbar";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { IFrame } from "./IFrame";
import { FormValues } from "../../types";
import lz from "lzutf8";
import { RootContainer } from "./user/RootContainer";

export const Constructor = ({
  onSave,
  templateData,
}: {
  onSave: (data: FormValues) => void;
  templateData: FormValues;
}) => {
  const { query } = useEditor();

  const [name, setName] = React.useState<string>(templateData.name);
  const [jsonState, setJsonState] = React.useState<string | undefined>();

  useEffect(() => {
    if (!templateData.state) {
      return;
    }

    const state = lz.decompress(lz.decodeBase64(templateData.state));
    setJsonState(state);
  }, [templateData.state]);

  const handleSave = () => {
    const json = query.serialize();
    const state = lz.encodeBase64(lz.compress(json));

    const constructorIframe = document.getElementById(
      "constructor-iframe"
    ) as HTMLIFrameElement;
    const doc = constructorIframe.contentWindow?.document;
    if (!doc) {
      return;
    }

    const rootContainer = doc.querySelector('[data-cy="root-container"]');
    const clonedNode = rootContainer?.cloneNode(true) as HTMLElement;

    const links = clonedNode.querySelectorAll("a");
    links.forEach((link) => {
      const dataHref = link.getAttribute("data-href");
      if (dataHref) {
        link.setAttribute("href", dataHref);
        link.removeAttribute("data-href");
      }
    });

    onSave({
      state,
      body: clonedNode.outerHTML,
      name,
    });
  };

  return (
    <>
      <Topbar onSave={handleSave} name={name} setName={setName} />
      <Grid
        container
        spacing={5}
        style={{ paddingTop: "10px" }}
        flexDirection={"row"}
      >
        <Grid item xs display={"flex"}>
          <IFrame
            id="constructor-iframe"
            style={{ width: "600px", padding: 0, border: "none" }}
          >
            <Frame data={jsonState}>
              <Element canvas is={RootContainer}>
                <Text text="Hi world!" data-cy="frame-text" />
                <Element canvas is={Container} data-cy="frame-container">
                  <Text text="It's me again!" data-cy="frame-container-text" />
                </Element>
              </Element>
            </Frame>
            <style>
              {`
              body {
                margin: 0;
                padding: 0;
              }
            `}
            </style>
          </IFrame>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <SettingsPanel />
            <Toolbox />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
