import { useNode } from "@craftjs/core";
import React from "react";
import { TextInput } from "../common/settings/TextInput";
import { NumberInput } from "../common/settings/NumberInput";
import { ColorInput } from "../common/settings/ColorInput";

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
  background?: string;
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
        label="Border"
        value={props.border}
        onChange={(border) =>
          setProp((props: { border: string }) => (props.border = border))
        }
      />
      <NumberInput
        label="Border Radius"
        value={props.borderRadius}
        onChange={(borderRadius) =>
          setProp(
            (props: { borderRadius: number }) =>
              (props.borderRadius = borderRadius)
          )
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
      <TextInput
        label="Flex Direction"
        value={props.flexDirection}
        onChange={(flexDirection) =>
          setProp(
            (props: { flexDirection: string }) =>
              (props.flexDirection = flexDirection)
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
      <TextInput
        label="Align Self"
        value={props.alignSelf}
        onChange={(alignSelf) =>
          setProp(
            (props: { alignSelf: string }) => (props.alignSelf = alignSelf)
          )
        }
      />
    </div>
  );
};

export const ContainerDefaultProps = {
  padding: 5,
  border: "1px solid",
  borderRadius: 0,
  backgroundColor: "white",
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
