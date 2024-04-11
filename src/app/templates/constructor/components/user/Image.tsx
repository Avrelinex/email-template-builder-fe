/* eslint-disable @next/next/no-img-element */
import { ApiClient, ImageResponse } from "@/app/lib/apiClient";
import { useNode } from "@craftjs/core";
import { useQuery } from "@tanstack/react-query";
import { SettingInputs } from "../common/settings/SettingInputs";

export const Image = ({
  src,
  alt,
  width,
  height,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}) => {
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
        width: `${width}px`,
        height: `${height}px`,
        background: "#eee",
        maxWidth: "100%",
        filter: "invert(0)",
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

  const fields = [
    { label: "Source", type: "image", key: "src" },
    { label: "Alt", type: "text", key: "alt" },
    { label: "Width", type: "number", key: "width" },
    { label: "Height", type: "number", key: "height" },
  ];

  return <SettingInputs fields={fields} props={props} setProp={setProp} />;
};

const defaultProps = {
  src: "",
  alt: "",
  width: 100,
  height: 100,
};

Image.craft = {
  related: {
    settings: ImageSettings,
  },
  defaultProps,
};
