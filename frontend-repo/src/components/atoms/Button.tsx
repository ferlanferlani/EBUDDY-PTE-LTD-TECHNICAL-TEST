"use client";
import { Button as MUIButton } from "@mui/material";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  color?: "primary" | "error";
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

export default function Button({
  children,
  color = "primary",
  ...props
}: ButtonProps) {
  if ("href" in props && props.href) {
    return (
      <Link href={props.href} passHref>
        <MUIButton variant="contained" color={color} size="large">
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
