import { ColorInput } from "./ColorInput";
import { NumberInput } from "./NumberInput";
import { TextInput } from "./TextInput";

export const SettingInputs = ({
  setProp,
  props,
  fields,
}: {
  setProp: (fn: (props: any) => void) => void;
  props: any;
  fields: {
    label: string;
    type: string;
    key: string;
  }[];
}) => {
  return (
    <div>
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <TextInput
                key={field.key}
                label={field.label}
                value={props[field.key]}
                onChange={(value) =>
                  setProp(
                    (props: { [key: string]: string }) =>
                      (props[field.key] = value)
                  )
                }
              />
            );
          case "number":
            return (
              <NumberInput
                key={field.key}
                label={field.label}
                value={props[field.key]}
                onChange={(value) =>
                  setProp(
                    (props: { [key: string]: number }) =>
                      (props[field.key] = value)
                  )
                }
              />
            );
          case "color":
            return (
              <ColorInput
                key={field.key}
                label={field.label}
                value={props[field.key]}
                onChange={(value) =>
                  setProp(
                    (props: { [key: string]: string }) =>
                      (props[field.key] = value)
                  )
                }
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
