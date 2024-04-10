import { useNode } from "@craftjs/core";
import React from "react";
import { TextInput } from "../common/settings/TextInput";
import { NumberInput } from "../common/settings/NumberInput";
import { ColorInput } from "../common/settings/ColorInput";

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

  return (
    <div>
      <TextInput
        label="Background Image"
        value={props.backgroundImage}
        onChange={(backgroundImage) =>
          setProp(
            (props: { backgroundImage: string }) =>
              (props.backgroundImage = backgroundImage)
          )
        }
      />
      <ColorInput
        label="Background Color"
        value={props.backgroundColor}
        onChange={(backgroundColor) =>
          setProp(
            (props: { backgroundColor: string }) =>
              (props.backgroundColor = backgroundColor)
          )
        }
      />
      <NumberInput
        label="Padding"
        value={props.padding}
        onChange={(padding) =>
          setProp((props: { padding: number }) => (props.padding = padding))
        }
      />
      <TextInput
        label="Justify Content"
        value={props.justifyContent}
        onChange={(justifyContent) =>
          setProp(
            (props: { justifyContent: string }) =>
              (props.justifyContent = justifyContent)
          )
        }
      />
      <TextInput
        label="Align Items"
        value={props.alignItems}
        onChange={(alignItems) =>
          setProp(
            (props: { alignItems: string }) => (props.alignItems = alignItems)
          )
        }
      />
      <NumberInput
        label="Gap"
        value={props.gap}
        onChange={(gap) =>
          setProp((props: { gap: number }) => (props.gap = gap))
        }
      />
    </div>
  );
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
