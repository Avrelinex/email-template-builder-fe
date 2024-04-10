import { useNode } from "@craftjs/core";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { NumberInput } from "../common/settings/NumberInput";
import { TextInput } from "../common/settings/TextInput";

export const Text = ({
  text,
  fontSize,
  color,
  backgroundColor,
  border,
  borderRadius,
  padding,
  ...props
}: {
  text: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: number;
  padding?: number;
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div
      {...props}
      ref={(ref) => {
        ref && connect(drag(ref));
      }}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e: { target: { value: string } }) =>
          setProp(
            (props: { text: any }) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
            500
          )
        }
        style={{ 
          fontSize: `${fontSize}px`,
          padding: `${padding}px`,
          border,
          borderRadius: `${borderRadius}px`,
          color,
          backgroundColor,
        }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      <NumberInput
        label="Font Size"
        value={props.fontSize}
        onChange={(fontSize) =>
          setProp((props: { fontSize: number }) => (props.fontSize = fontSize))
        }
      />
      <TextInput
        label="Color"
        value={props.color}
        onChange={(color) =>
          setProp((props: { color: string }) => (props.color = color))
        }
      />
      <TextInput
        label="Background Color"
        value={props.backgroundColor}
        onChange={(backgroundColor) =>
          setProp(
            (props: { backgroundColor: string }) =>
              (props.backgroundColor = backgroundColor)
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
      <NumberInput
        label="Padding"
        value={props.padding}
        onChange={(padding) =>
          setProp((props: { padding: number }) => (props.padding = padding))
        }
      />
    </>
  );
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
  color: "black",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: 0,
  padding: 0,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
