export const ColorInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <label>{label}</label>
      {value !== "transparent" && (
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <label
        style={{
          display: "block",
          padding: "4px 8px",
        }}
      >
        Transparent
        <input
          type="checkbox"
          checked={value === "transparent"}
          onChange={(e) =>
            onChange(e.target.checked ? "transparent" : "#ffffff")
          }
        />
      </label>
    </div>
  );
};
