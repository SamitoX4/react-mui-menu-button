import React from "react";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import type { SxProps, Theme } from "@mui/material";
import { useDropdownContext } from "../core/context/DropdownContext";

export interface DropdownTriggerProps {
  triggerText?: string | React.ReactNode;
  triggerIcon?: React.ReactNode;
  triggerSx?: SxProps<Theme>;
  buttonVariant?: "text" | "outlined" | "contained";
  buttonColor?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
  buttonSize?: "small" | "medium" | "large";
  disabled?: boolean;
  renderTrigger?: (props: {
    isOpen: boolean;
    toggle: () => void;
    ref: React.Ref<HTMLElement>;
  }) => React.ReactNode;
}

/**
 * Botón que abre/cierra el menú.
 * Puede renderizarse de forma personalizada mediante `renderTrigger`.
 */
export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  triggerText = "EXPLORAR",
  triggerIcon,
  triggerSx,
  buttonVariant = "text",
  buttonColor = "inherit",
  buttonSize = "medium",
  disabled = false,
  renderTrigger,
}) => {
  const { isOpen, setIsOpen, handleMouseEnter, handleMouseLeave } =
    useDropdownContext();

  const toggle = () => {
    // Alterna el estado de apertura del menú
    setIsOpen(!isOpen);
  };

  if (renderTrigger) {
    return renderTrigger({ isOpen, toggle, ref: React.createRef() });
  }

  return (
    <Button
      variant={buttonVariant}
      color={buttonColor}
      size={buttonSize}
      endIcon={isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      startIcon={triggerIcon}
      sx={[
        {
          minWidth: "120px",
          fontWeight: 500,
          position: "relative",
          zIndex: 1300,
        },
        ...(triggerSx
          ? Array.isArray(triggerSx)
            ? triggerSx
            : [triggerSx]
          : []),
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggle}
      disabled={disabled}
    >
      {triggerText}
    </Button>
  );
};
