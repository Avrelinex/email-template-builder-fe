import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, TextField } from "@mui/material";

export const Link = ({ text, link }: { text?: string; link?: string }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <a
      ref={(ref) => {
        ref && connect(drag(ref));
      }}
      href={"#" + link}
    >
      {text}
    </a>
  );
};

export const LinkSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Text</FormLabel>
        <TextField
          value={props.text}
          onChange={(e) =>
            setProp((props: { text: string }) => (props.text = e.target.value))
          }
        />
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Link</FormLabel>
        <TextField
          value={props.link}
          onChange={(e) =>
            setProp((props: { link: string }) => (props.link = e.target.value))
          }
        />
      </FormControl>
    </div>
  );
};

Link.craft = {
  related: {
    settings: LinkSettings,
  },
};
