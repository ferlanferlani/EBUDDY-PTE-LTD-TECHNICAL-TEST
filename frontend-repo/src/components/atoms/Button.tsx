"use client";
import { Button as MUIButton } from "@mui/material";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  color?: "primary" | "error";
  sx?: any;
  variant?: "contained" | "outlined";
  disabled?: boolean;
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

export default function Button({
  children,
  color = "primary",
  disabled = false,
  variant = "contained",
  ...props
}: ButtonProps) {
  if ("href" in props && props.href) {
    return (
      <Link href={props.href} passHref>
        <MUIButton
          sx={props.sx}
          disabled={disabled}
          variant="contained"
          color={color}
          size="large"
        >
          {children}
        </MUIButton>
      </Link>
    );
  }

  return (
    <MUIButton
      variant="contained"
      color={color}
      size="large"
      onClick={props.onClick}
    >
      {children}
    </MUIButton>
  );
}
