import { ApiClient, ImageResponse } from "@/app/lib/apiClient";
import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

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

  const { data, isLoading, error } = useQuery<ImageResponse[], Error>({
    queryKey: ["images"],
    queryFn: () => ApiClient.getInstance().getImages(),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data && (
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Select from uploaded</FormLabel>
          <select
            value={props.src}
            onChange={(e) =>
              setProp((props: { src: string }) => (props.src = e.target.value))
            }
          >
            <option value="" disabled hidden>
              Select an image
            </option>
            {data.map((image) => (
              <option
                key={image.id}
                value={`http://localhost:3000/images/${image.id}`}
              >
                {image.displayName}
              </option>
            ))}
            {props.src && !data.find((image) => image.id === props.src) && (
              <option value={props.src} disabled hidden>
                Custom image
              </option>
            )}
          </select>
        </FormControl>
      )}
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Source</FormLabel>
        <TextField
          value={props.src}
          onChange={(e) =>
            setProp((props: { src: string }) => (props.src = e.target.value))
          }
        />
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
