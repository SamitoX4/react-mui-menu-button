import React from "react";
import { Paper, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDropdownContext } from "../core/context/DropdownContext";
import { MenuItemComponent } from "./MenuItemComponent";

/**
 * Componente que renderiza el contenido del menú desplegable.
 * Solo se muestra cuando `isOpen` es `true`.
 */
export const DropdownContent: React.FC = () => {
  const theme = useTheme();
  const { isOpen, menuItems, handleMouseEnter } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <Paper
      elevation={8}
      onMouseEnter={handleMouseEnter}
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        mt: 0.5,
        ml: 0.25,
        minWidth: 250,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1300,
        overflow: "visible",
      }}
    >
      <List sx={{ py: 0.5 }}>
        {menuItems.map((item, index) => (
          <MenuItemComponent key={index} item={item} path={[index]} depth={0} />
        ))}
      </List>
    </Paper>
  );
};
