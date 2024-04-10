import { useNode } from "@craftjs/core";
import React from "react";
import { TextInput } from "../common/settings/TextInput";
import { NumberInput } from "../common/settings/NumberInput";

export const Button = ({
  text,
  textColor,
  size,
  padding,
  border,
  borderRadius,
  backgroundColor,
  backgroundImage,
  ...props
}: {
  text: string;
  textColor?: string;
  size?: number;
  padding?: number;
  border?: string;
  borderRadius?: number;
  backgroundColor?: string;
  backgroundImage?: string;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <button
      ref={(ref) => {
        ref && connect(drag(ref));
      }}
      style={{
        margin: "5px",
        padding: `${padding}px`,
        border,
        borderRadius: `${borderRadius}px`,
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
        fontSize: `${size}px`,
        color: textColor,
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <TextInput
        label="Text"
        value={props.text}
        onChange={(text) =>
          setProp((props: { text: string }) => (props.text = text))
        }
      />
      <NumberInput
        label="Size"
        value={props.size}
        onChange={(size) =>
          setProp((props: { size: number }) => (props.size = size))
        }
      />
      <NumberInput
        label="Padding"
        value={props.padding}
        onChange={(padding) =>
          setProp((props: { padding: number }) => (props.padding = padding))
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
        label="Background"
        value={props.backgroundColor}
        onChange={(backgroundColor) =>
          setProp(
            (props: { backgroundColor: string }) =>
              (props.backgroundColor = backgroundColor)
          )
        }
      />
      <TextInput
        label="Text Color"
        value={props.textColor}
        onChange={(textColor) =>
          setProp(
            (props: { textColor: string }) => (props.textColor = textColor)
          )
        }
      />
      <TextInput
        label="Border"
        value={props.border}
        onChange={(border) =>
          setProp((props: { border: string }) => (props.border = border))
        }
      />
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
    </div>
  );
};

export const ButtonDefaultProps = {
  text: "Click me",
  textColor: "black",
  size: 16,
  padding: 8,
  border: "solid 1px black",
  borderRadius: 0,
  backgroundColor: "transparent",
  backgroundImage: "none",
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
