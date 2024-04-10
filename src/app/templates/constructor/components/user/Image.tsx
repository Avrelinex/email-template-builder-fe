import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { useState } from "react";

export const Image = ({ src, alt }: { src?: string; alt?: string }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <img
      ref={(ref) => {
        ref && connect(drag(ref));
      }}
      src={src}
      alt={alt}
      style={{
        minWidth: "100px",
        minHeight: "100px",
        background: "#eee",
        maxWidth: "100%",
      }}
    />
  );
};

export const ImageSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const [images, setImages] = useState<string[]>([]);

  const fetchAllImages = async () => {
    const res = await fetch("http://localhost:3000/images");
    const data = await res.json();
    setImages(
      data.map(({ id }: { id: string }) => `http://localhost:3000/images/${id}`)
    );
  };

  return (
    <div>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Fetch</FormLabel>
        <button onClick={fetchAllImages}>Fetch Images</button>
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Source</FormLabel>
        <select
          value={props.src}
          onChange={(e) =>
            setProp((props: { src: string }) => (props.src = e.target.value))
          }
        >
          {images.map((image) => (
            <option key={image} value={image}>
              {image}
            </option>
          ))}
        </select>
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Alt</FormLabel>
        <TextField
          value={props.alt}
          onChange={(e) =>
            setProp((props: { alt: string }) => (props.alt = e.target.value))
          }
        />
      </FormControl>
    </div>
  );
};

const defaultProps = {
  src: "",
  alt: "",
};

Image.craft = {
  related: {
    settings: ImageSettings,
  },
  defaultProps,
};
