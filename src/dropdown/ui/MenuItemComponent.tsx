import React from "react";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  Typography,
  alpha,
  Paper,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDropdownContext } from "../core/context/DropdownContext";
import { MenuItem } from "../core/types";

interface MenuItemComponentProps {
  item: MenuItem;
  path: number[];
  depth: number;
}

/**
 * Componente que representa un item individual del menú.
 * Soporta:
 * - Renderizado como enlace (<a>) o botón según `useAnchorTags`.
 * - Submenús anidados (renderizado recursivo).
 * - Iconos, estados hover/active, y estilos por densidad.
 */
export const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  path,
  depth,
}) => {
  const theme = useTheme();
  const {
    activePath,
    handleItemClick,
    handleItemMouseEnter,
    handleItemMouseLeave,
    getItemDepth,
    useAnchorTags,
    buildItemUrl,
    getBaseHrefForPath,
    itemSx,
    submenuSx,
    getDensityStyles,
    showDividers,
    dividerColor,
    submenuIcon,
    iconPosition,
    renderItem,
    renderSubmenu,
    itemHasChildren,
  } = useDropdownContext();

  const isActive = activePath?.join(",").startsWith(path.join(",")) || false;
  const hasChildren = itemHasChildren(item);
  const currentDepth = getItemDepth(path);

  const baseHref = getBaseHrefForPath(path);
  const itemUrl = buildItemUrl(item, baseHref);
  const shouldUseAnchor =
    useAnchorTags && (item.href || item.hash) && !hasChildren;

  const densityStyles = getDensityStyles();
  const customItemSx = {
    ...densityStyles,
    ...(itemSx || {}),
    borderBottom:
      showDividers && depth === 0 ? `1px solid ${dividerColor}` : "none",
  };

  const handleClick = () => {
    handleItemClick(item, path);
  };

  const handleMouseEnter = () => {
    handleItemMouseEnter(path);
  };

  // Renderizado personalizado
  if (renderItem) {
    return renderItem({
      item,
      path,
      depth,
      isActive,
      hasChildren,
      onClick: handleClick,
    });
  }

  return (
    <Box
      sx={{
        position: "relative",
        borderBottom:
          showDividers && depth > 0
            ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
            : "none",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleItemMouseLeave}
    >
      {shouldUseAnchor ? (
        // Versión enlace (SEO / accesibilidad)
        <Link
          href={itemUrl}
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: customItemSx.py,
            px: 2,
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            ...customItemSx,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ListItemIcon sx={{ minWidth: "auto", color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <Typography
              variant="body2"
              sx={{ fontWeight: depth === 0 ? 500 : "normal" }}
            >
              {item.label}
            </Typography>
          </Box>
          {hasChildren && (
            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              {submenuIcon}
            </Box>
          )}
        </Link>
      ) : (
        // Versión botón
        <ListItemButton
          onClick={handleClick}
          sx={{
            py: customItemSx.py,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            ...customItemSx,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ListItemIcon sx={{ minWidth: "auto", color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <Typography
              variant="body2"
              sx={{ fontWeight: depth === 0 ? 500 : "normal" }}
            >
              {item.label}
            </Typography>
          </Box>
          {hasChildren && iconPosition === "end" && (
            <Box sx={{ ml: 1 }}>{submenuIcon}</Box>
          )}
          {hasChildren && iconPosition === "start" && (
            <Box sx={{ mr: 1 }}>{submenuIcon}</Box>
          )}
        </ListItemButton>
      )}

      {/* Submenú recursivo */}
      {isActive && hasChildren && (
        <Paper
          elevation={8}
          sx={[
            {
              position: "absolute",
              top: 0,
              left: "100%",
              ml: 0.25,
              minWidth: 220,
              maxWidth: 300,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              zIndex: 1300 + currentDepth,
              overflow: "visible",
            },
            ...(submenuSx
              ? Array.isArray(submenuSx)
                ? submenuSx
                : [submenuSx]
              : []),
          ]}
          onMouseEnter={() => handleItemMouseEnter(path)}
          onMouseLeave={handleItemMouseLeave}
        >
          <Box sx={{ py: 0.5 }}>
            {renderSubmenu
              ? renderSubmenu({
                  items: item.children!,
                  depth: depth + 1,
                  parentPath: path,
                })
              : item.children!.map((child, index) => (
                  <MenuItemComponent
                    key={index}
                    item={child}
                    path={[...path, index]}
                    depth={depth + 1}
                  />
                ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};
