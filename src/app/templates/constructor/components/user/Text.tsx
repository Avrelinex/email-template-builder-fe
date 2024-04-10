import { useNode } from "@craftjs/core";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { SettingInputs } from "../common/settings/SettingInputs";

export const Text = ({
  text,
  fontSize,
  color,
  border,
  borderRadius,
  padding,
  ...props
}: {
  text: string;
  fontSize?: number;
  color?: string;
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

  const fields = [
    { label: "Text", type: "text", key: "text" },
    { label: "Font Size", type: "number", key: "fontSize" },
    { label: "Color", type: "color", key: "color" },
    { label: "Border", type: "text", key: "border" },
    { label: "Border Radius", type: "number", key: "borderRadius" },
    { label: "Padding", type: "number", key: "padding" },
  ];

  return <SettingInputs setProp={setProp} props={props} fields={fields} />;
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
  color: "#000000",
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
