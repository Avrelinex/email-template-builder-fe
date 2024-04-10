import { useNode } from "@craftjs/core";
import { SettingInputs } from "../common/settings/SettingInputs";
import React from "react";

export const Link = ({
  link,
  padding,
  border,
  borderRadius,
  backgroundColor,
  backgroundImage,
  children,
  ...props
}: {
  link?: string;
  padding?: number;
  border?: string;
  borderRadius?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <a
      {...props}
      ref={(ref: any) => connect(drag(ref))}
      style={{
        padding: `${padding}px`,
        border,
        borderRadius: `${borderRadius}px`,
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`,

        cursor: "pointer",
        textDecoration: "none",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      target="_blank"
      data-href={link}
    >
      {children}
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

  const fields = [
    { label: "Link", type: "text", key: "link" },
    { label: "Background Image", type: "text", key: "backgroundImage" },
    { label: "Background Color", type: "color", key: "backgroundColor" },
    { label: "Padding", type: "number", key: "padding" },
    { label: "Border", type: "text", key: "border" },
    { label: "Border Radius", type: "number", key: "borderRadius" },
  ];

  return <SettingInputs setProp={setProp} props={props} fields={fields} />;
};

export const LinkDefaultProps = {
  padding: 5,
  border: "1px solid",
  borderRadius: 0,
  backgroundColor: "#bbbbbb",
  backgroundImage: "",
};

Link.craft = {
  props: LinkDefaultProps,
  related: {
    settings: LinkSettings,
  },
};
