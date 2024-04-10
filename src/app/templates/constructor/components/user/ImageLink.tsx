import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, TextField } from "@mui/material";
import NextImage from "next/image";
import { useState } from "react";

export const ImageLink = ({
  src,
  alt,
  link,
}: {
  src?: string;
  alt?: string;
  link?: string;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <a
      href={"#" + link}
      ref={(ref) => {
        ref && connect(drag(ref));
      }}
    >
      <img
        src={src || ""}
        alt={alt || ""}
        style={{
          margin: "5px",
          minWidth: "100px",
          minHeight: "100px",
          background: "#ccc",
        }}
      />
    </a>
  );
};

export const ImageLinkSettings = () => {
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

ImageLink.craft = {
  related: {
    settings: ImageLinkSettings,
  },
};
