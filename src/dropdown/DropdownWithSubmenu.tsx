import React from "react";
import { DropdownMenu, DropdownTrigger, DropdownContent } from "../index";
import { menuItems as defaultMenuItems } from "./data/menuData";
import type { DropdownWithSubmenuProps } from "./core/types";

/**
 * Componente de alto nivel que integra DropdownMenu, DropdownTrigger y DropdownContent.
 * Expone una API simplificada para el usuario final.
 */
const DropdownWithSubmenu: React.FC<DropdownWithSubmenuProps> = ({
  // Datos y contenido
  menuItems = defaultMenuItems,
  triggerText = "EXPLORAR",
  triggerIcon,
  emptyState,
  loading = false,
  loadingText = "Cargando...",

  // Comportamiento
  onItemClick,
  maxDepth = 5,
  openOnHover = true,
  closeOnClickOutside = true,
  closeDelay = 300,
  onOpen,
  onClose,
  onHoverItem,

  // Estilos MUI
  sx,
  triggerSx,
  paperSx,
  itemSx,
  submenuSx,
  buttonVariant = "text",
  buttonColor = "inherit",
  buttonSize = "medium",
  density = "standard",

  // Iconos
  expandIcon,
  collapseIcon,
  submenuIcon,
  iconPosition = "end",
  showDividers = false,
  dividerColor = "divider",

  // Comportamiento avanzado
  open,
  defaultOpen = false,
  initialDepth = 0,
  autoExpandDepth = 0,
  scrollIntoView = true,
  scrollOffset = 80,
  scrollBehavior = "smooth",
  disabled = false,
  readOnly = false,

  // Accesibilidad
  ariaLabel = "Menú desplegable",
  ariaLabelledBy,
  ariaDescribedBy,
  role = "menu",
  keyboardNavigation = true,
  focusOnOpen = true,
  useAnchorTags = true,
  rel,

  // Internacionalización
  translations,
  direction = "ltr",

  // Renderizado personalizado
  renderTrigger,
  renderItem,
  renderSubmenu,

  // Temas
  variant = "default",
  customTheme,
}) => {
  return (
    <DropdownMenu
      // Datos y estado
      menuItems={menuItems}
      loading={loading}
      loadingText={loadingText}
      emptyState={emptyState}
      // Comportamiento
      onItemClick={onItemClick}
      maxDepth={maxDepth}
      openOnHover={openOnHover}
      closeOnClickOutside={closeOnClickOutside}
      closeDelay={closeDelay}
      onOpen={onOpen}
      onClose={onClose}
      onHoverItem={onHoverItem}
      // Control de estado
      open={open}
      defaultOpen={defaultOpen}
      disabled={disabled}
      readOnly={readOnly}
      // Scroll y navegación
      scrollIntoView={scrollIntoView}
      scrollOffset={scrollOffset}
      scrollBehavior={scrollBehavior}
      initialDepth={initialDepth}
      autoExpandDepth={autoExpandDepth}
      // Accesibilidad
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      role={role}
      keyboardNavigation={keyboardNavigation}
      focusOnOpen={focusOnOpen}
      useAnchorTags={useAnchorTags}
      rel={rel}
      // Internacionalización
      translations={translations}
      direction={direction}
      // Temas
      variant={variant}
      customTheme={customTheme}
      // Estilos
      sx={sx}
      paperSx={paperSx}
      itemSx={itemSx}
      submenuSx={submenuSx}
      density={density}
      showDividers={showDividers}
      dividerColor={dividerColor}
      // Iconos
      expandIcon={expandIcon}
      collapseIcon={collapseIcon}
      submenuIcon={submenuIcon}
      iconPosition={iconPosition}
      // Renderizado personalizado
      renderItem={renderItem}
      renderSubmenu={renderSubmenu}
    >
      <DropdownTrigger
        triggerText={triggerText}
        triggerIcon={triggerIcon}
        triggerSx={triggerSx}
        buttonVariant={buttonVariant}
        buttonColor={buttonColor}
        buttonSize={buttonSize}
        disabled={disabled}
        renderTrigger={renderTrigger}
      />
      <DropdownContent />
    </DropdownMenu>
  );
};

export default DropdownWithSubmenu;
