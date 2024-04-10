import { useNode } from "@craftjs/core";
import React from "react";
import { SettingInputs } from "../common/settings/SettingInputs";

export const RootContainer = ({
  padding,
  backgroundColor,
  backgroundImage,
  justifyContent,
  alignItems,
  gap,
  children,
  ...props
}: {
  padding?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
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
        padding: `${padding}px`,
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
        justifyContent,
        alignItems,
        gap: `${gap}px`,

        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        width: "100%",
        boxSizing: "border-box",
      }}
      data-cy="root-container"
    >
      {children}
    </div>
  );
};

export const RootContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const fields = [
    { label: "Background Image", type: "text", key: "backgroundImage" },
    { label: "Background Color", type: "color", key: "backgroundColor" },
    { label: "Padding", type: "number", key: "padding" },
    { label: "Justify Content", type: "text", key: "justifyContent" },
    { label: "Align Items", type: "text", key: "alignItems" },
    { label: "Gap", type: "number", key: "gap" },
  ];

  return <SettingInputs setProp={setProp} props={props} fields={fields} />;
};

export const RootContainerDefaultProps = {
  padding: 5,
  backgroundColor: "#dddddd",
  backgroundImage: "",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: 0,
};

RootContainer.craft = {
  props: RootContainerDefaultProps,
  related: {
    settings: RootContainerSettings,
  },
  custom: {
    unDeleatable: true,
  },
};
