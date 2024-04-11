import { useEditor, Element } from "@craftjs/core";
import { Box, Typography, Grid, Button as MaterialButton } from "@mui/material";
import React from "react";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import Crop54Icon from "@mui/icons-material/Crop54";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { Image } from "./user/Image";
import { Link } from "./user/Link";
import { Signature } from "./user/Signature";
import { LinkSection } from "./user/LinkSection";
import { SocialMediaLinks } from "./user/SocialMediaLinks";

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Box px={2} py={2} border="1px solid black" borderRadius="0.3rem">
      <Grid container direction="row" spacing={1}>
        <Grid direction="column" container item>
          <Box pb={2}>
            <Typography style={{ fontWeight: "bold" }}>Drag to add</Typography>
          </Box>
        </Grid>
        <Grid direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Text text="Hi world" />)}
            variant="contained"
            style={{ backgroundColor: "black", width: "fit-content" }}
            data-cy="toolbox-text"
          >
            <TextFieldsIcon />
          </MaterialButton>
        </Grid>
        <Grid direction="column" item>
          <MaterialButton
            ref={(ref: any) => {
              ref &&
                connectors.create(
                  ref,
                  <Element canvas is={Container} padding={20} />
                );
            }}
            variant="contained"
            style={{ backgroundColor: "black", width: "fit-content" }}
            data-cy="toolbox-container"
          >
            <Crop54Icon />
          </MaterialButton>
        </Grid>
        <Grid direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Image alt="" />)}
            variant="contained"
            style={{ backgroundColor: "black", width: "fit-content" }}
            data-cy="toolbox-text-1"
          >
            <ImageIcon />
          </MaterialButton>
        </Grid>
        <Grid direction="column" item>
          <MaterialButton
            ref={(ref: any) =>
              connectors.create(
                ref,
                <Element canvas is={Link}>
                  <Text text="Link Text" />
                </Element>
              )
            }
            variant="contained"
            style={{ backgroundColor: "black", width: "fit-content" }}
            data-cy="toolbox-text-3"
          >
            <LinkIcon />
          </MaterialButton>
        </Grid>
        <Grid direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Signature />)}
            variant="contained"
            style={{ backgroundColor: "black", width: "fit-content" }}
            data-cy="toolbox-text-4"
          >
            <HistoryEduIcon />
          </MaterialButton>
        </Grid>
        <Grid direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <LinkSection />)}
            variant="contained"
            style={{ backgroundColor: "black", width: "fit-content" }}
            data-cy="toolbox-text-5"
          >
            <LinkIcon />
            <LinkIcon />
            <LinkIcon />
          </MaterialButton>
        </Grid>
        <Grid direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <SocialMediaLinks />)}
            variant="contained"
            style={{ backgroundColor: "black", width: "fit-content" }}
            data-cy="toolbox-text-6"
          >
            <InstagramIcon />
            <LinkedInIcon />
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
