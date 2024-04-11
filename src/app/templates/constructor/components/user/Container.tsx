import { useNode } from "@craftjs/core";
import React from "react";
import { SettingInputs } from "../common/settings/SettingInputs";

export const Container = ({
  padding,
  border,
  borderRadius,
  backgroundColor,
  backgroundImage,
  justifyContent,
  alignItems,
  flexDirection,
  gap,
  alignSelf,
  children,
  ...props
}: {
  padding?: number;
  border?: string;
  borderRadius?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  gap?: number;
  alignSelf?: string;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      {...props}
      ref={(ref: any) => connect(drag(ref))}
      style={{
        display: "flex",
        padding: `${padding}px`,
        border,
        borderRadius: `${borderRadius}px`,
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
        justifyContent,
        alignItems,
        gap: `${gap}px`,
        flexDirection,
        alignSelf,
      }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const fields = [
    { label: "Background Image", type: "image", key: "backgroundImage" },
    { label: "Background Color", type: "color", key: "backgroundColor" },
    { label: "Padding", type: "number", key: "padding" },
    { label: "Border", type: "text", key: "border" },
    { label: "Border Radius", type: "number", key: "borderRadius" },
    { label: "Justify Content", type: "text", key: "justifyContent" },
    { label: "Align Items", type: "text", key: "alignItems" },
    { label: "Flex Direction", type: "text", key: "flexDirection" },
    { label: "Gap", type: "number", key: "gap" },
    { label: "Align Self", type: "text", key: "alignSelf" },
  ];

  return <SettingInputs setProp={setProp} props={props} fields={fields} />;
};

export const ContainerDefaultProps = {
  padding: 5,
  border: "1px solid",
  borderRadius: 0,
  backgroundColor: "#cccccc",
  backgroundImage: "",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: 0,
  flexDirection: "row",
  alignSelf: "auto",
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
