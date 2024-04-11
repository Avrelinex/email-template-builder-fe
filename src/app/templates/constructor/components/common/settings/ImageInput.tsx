import { FormControl, FormLabel, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ImageDto } from "@/app/lib/dto/image/Image.dto";
import { ApiClient } from "@/app/lib/apiClient";
import { TextInput } from "./TextInput";

export const ImageInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const { data, isLoading, error } = useQuery<ImageDto[], Error>({
    queryKey: ["images"],
    queryFn: () => ApiClient.getInstance().getImages(),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const getImageSrc = (id: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/images/${id}`;
  };

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
        {data && (
          <>
            <label>Select from uploaded</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
              <option value="" disabled hidden>
                Select an image
              </option>
              {data.map((image) => (
                <option key={image.id} value={getImageSrc(image.id)}>
                  {image.displayName}
                </option>
              ))}
              {value &&
                !data.find((image) => value === getImageSrc(image.id)) && (
                  <option value={value} disabled hidden>
                    Custom image
                  </option>
                )}
            </select>
          </>
        )}
        <TextInput
          label="Source"
          value={value}
          onChange={(newValue) => onChange(newValue)}
        />
      </div>
    </div>
  );
};
