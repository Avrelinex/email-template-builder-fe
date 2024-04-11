import { ApiClient, ImageResponse } from "@/app/lib/apiClient";
import { useNode } from "@craftjs/core";
import { useQuery } from "@tanstack/react-query";
import { SettingInputs } from "../common/settings/SettingInputs";

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

  const fields = [
    { label: "Source", type: "image", key: "src" },
    { label: "Alt", type: "text", key: "alt" },
  ];

  return <SettingInputs fields={fields} props={props} setProp={setProp} />;
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
