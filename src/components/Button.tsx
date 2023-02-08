import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { PropsWithChildren } from "react";

interface ButtonProps {
  // size: "small" | "medium" | "large";
  // variant?: "contained";
  color?: "primary" | "danger";
  onClick: () => void;
}

const colorTable: Record<string, MuiButtonProps["color"]> = {
  primary: "primary",
  danger: "error",
};

export const Button = ({
  children,
  onClick,
  color,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <MuiButton
      variant="contained"
      color={colorTable[color || "primary"]}
      size="large"
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
