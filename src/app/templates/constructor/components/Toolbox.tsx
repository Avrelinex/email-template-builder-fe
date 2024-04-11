import { useEditor, Element } from "@craftjs/core";
import { Box, Typography, Grid, Button as MaterialButton } from "@mui/material";
import React from "react";

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
    <Box px={2} py={2}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Text text="Hi world" />)}
            variant="contained"
            data-cy="toolbox-text"
          >
            Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => {
              ref &&
                connectors.create(
                  ref,
                  <Element canvas is={Container} padding={20} />
                );
            }}
            variant="contained"
            data-cy="toolbox-container"
          >
            Container
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Image alt="" />)}
            variant="contained"
            data-cy="toolbox-text-1"
          >
            Image
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
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
            data-cy="toolbox-text-3"
          >
            Link
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Signature />)}
            variant="contained"
            data-cy="toolbox-text-4"
          >
            Signature
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <LinkSection />)}
            variant="contained"
            data-cy="toolbox-text-5"
          >
            Link Section
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <SocialMediaLinks />)}
            variant="contained"
            data-cy="toolbox-text-6"
          >
            Social Media Links
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
