import { useEditor, Element } from "@craftjs/core";
import { Box, Typography, Grid, Button as MaterialButton } from "@mui/material";
import React from "react";

import { Button } from "./user/Button";
import { Container } from "./user/Container";
import { Text } from "./user/Text";
import { Image } from "./user/Image";
import { ImageLink } from "./user/ImageLink";
import { Link } from "./user/Link";

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
            ref={(ref: any) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
            variant="contained"
            data-cy="toolbox-button"
          >
            Button
          </MaterialButton>
        </Grid>
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
                  <Element canvas is={Container} padding={20} background={""} />
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
              connectors.create(ref, <ImageLink src="" alt="" link="" />)
            }
            variant="contained"
            data-cy="toolbox-text-2"
          >
            Image Link
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Link text="Hi world" />)}
            variant="contained"
            data-cy="toolbox-text-3"
          >
            Link Text
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
