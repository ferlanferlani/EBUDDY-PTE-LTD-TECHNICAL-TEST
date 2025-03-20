import { Typography as MUITypography } from "@mui/material";

type TypographyProps = {
  variant: "h3" | "h4" | "body1" | "h6";
  children: React.ReactNode;
};

export default function Typography({ variant, children }: TypographyProps) {
  return <MUITypography variant={variant}>{children}</MUITypography>;
}
