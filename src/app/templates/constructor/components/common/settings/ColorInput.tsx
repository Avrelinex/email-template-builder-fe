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
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
