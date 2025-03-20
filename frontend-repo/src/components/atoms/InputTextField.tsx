import { TextField } from "@mui/material";

type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
};

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  fullWidth,
}: InputProps) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      margin="normal"
    />
  );
}
