"use client";

import { Frame, Element, useEditor } from "@craftjs/core";
import { Paper, Grid } from "@mui/material";
import React from "react";

import { SettingsPanel } from "./SettingsPanel";
import { Toolbox } from "./Toolbox";
import { Topbar } from "./Topbar";
import { Button } from "./user/Button";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { IFrame } from "./IFrame";
import { FormValues } from "../../types";
import lz from "lzutf8";

export const Constructor = ({
  onSave,
  templateData,
}: {
  onSave: (data: FormValues) => void;
  templateData: FormValues;
}) => {
  const { actions, query } = useEditor();

  const [name, setName] = React.useState<string>(templateData.name);

  actions.deserialize(lz.decompress(lz.decodeBase64(templateData.state)));

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

    const rootContainer = doc.getElementById("root-container");
    const clonedNode = rootContainer?.cloneNode(true) as HTMLElement;

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
          <IFrame id="constructor-iframe" style={{ flex: "1 1 0" }}>
            <div id="constructor-wrapper">
              <Frame>
                <Element
                  canvas
                  is={Container}
                  padding={5}
                  background="#eeeeee"
                  data-cy="root-container"
                  id="root-container"
                >
                  <Button text="Click me" size="small" data-cy="frame-button" />
                  <Text fontSize={20} text="Hi world!" data-cy="frame-text" />
                  <Element
                    canvas
                    is={Container}
                    padding={6}
                    background="#999999"
                    data-cy="frame-container"
                  >
                    <Text
                      text="It's me again!"
                      data-cy="frame-container-text"
                    />
                  </Element>
                  <style>{`
                    #constructor-wrapper {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      width: 100%;
                    }

                    #root-container {
                      max-width: 600px;
                      width: 100%;
                      box-sizing: border-box;
                    }
                  `}</style>
                </Element>
              </Frame>
            </div>
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
