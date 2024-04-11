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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "4px 8px",
        }}
      >
        <label>
          Transparent
          <input
            type="checkbox"
            checked={value === "transparent"}
            onChange={(e) =>
              onChange(e.target.checked ? "transparent" : "#ffffff")
            }
          />
        </label>
        {value !== "transparent" && (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};
