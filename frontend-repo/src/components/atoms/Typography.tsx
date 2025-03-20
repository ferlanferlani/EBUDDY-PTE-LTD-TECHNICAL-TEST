import { Typography as MUITypography } from "@mui/material";

type TypographyProps = {
  variant: "h3" | "h4" | "body1" | "h6" | "h5";
  color: "primary" | "error";
  align?: "center" | "left" | "right";
  children: React.ReactNode;
};

export default function Typography({
  variant,
  children,
  color,
  align,
}: TypographyProps) {
  return (
    <MUITypography align={align} variant={variant} color={color}>
      {children}
    </MUITypography>
  );
}
