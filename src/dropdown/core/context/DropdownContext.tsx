import React, {
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {
  Box,
  CircularProgress,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useDropdown } from "../hooks/useDropdown";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import type {
  MenuItem,
  DropdownContextType,
  DropdownVariant,
  DropdownDensity,
  IconPosition,
  ScrollBehavior,
  CustomTheme,
  DropdownTranslations,
} from "../types";

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdownContext must be used within DropdownMenu");
  }
  return context;
};

interface DropdownMenuProps {
  children: ReactNode;

  // === 1. DATOS Y CONTENIDO ===
  menuItems: MenuItem[];
  loading?: boolean;
  loadingText?: string;
  emptyState?: React.ReactNode;

  // === 2. COMPORTAMIENTO ===
  onItemClick?: (item: MenuItem, path: number[]) => void;
  onHoverItem?: (item: MenuItem, path: number[]) => void;
  onOpen?: () => void;
  onClose?: () => void;
  maxDepth?: number;
  openOnHover?: boolean;
  closeOnClickOutside?: boolean;
  closeDelay?: number;

  // === 3. ESTILOS Y DISEÑO ===
  sx?: SxProps<Theme>;
  paperSx?: SxProps<Theme>;
  itemSx?: SxProps<Theme>;
  submenuSx?: SxProps<Theme>;
  density?: DropdownDensity;
  showDividers?: boolean;
  dividerColor?: string;

  // === 4. ICONOS ===
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  submenuIcon?: React.ReactNode;
  iconPosition?: IconPosition;

  // === 5. COMPORTAMIENTO AVANZADO ===
  open?: boolean;
  defaultOpen?: boolean;
  initialDepth?: number;
  autoExpandDepth?: number;
  scrollIntoView?: boolean;
  scrollOffset?: number;
  scrollBehavior?: ScrollBehavior;
  disabled?: boolean;
  readOnly?: boolean;

  // === 6. ACCESIBILIDAD Y SEO ===
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  keyboardNavigation?: boolean;
  focusOnOpen?: boolean;
  useAnchorTags?: boolean;
  rel?: string;

  // === 7. INTERNACIONALIZACIÓN ===
  translations?: DropdownTranslations;
  direction?: "ltr" | "rtl";

  // === 8. RENDERIZADO PERSONALIZADO ===
  renderItem?: (props: {
    item: MenuItem;
    path: number[];
    depth: number;
    isActive: boolean;
    hasChildren: boolean;
    onClick: () => void;
  }) => React.ReactNode;
  renderSubmenu?: (props: {
    items: MenuItem[];
    depth: number;
    parentPath: number[];
  }) => React.ReactNode;

  // === 9. TEMAS Y VARIANTES ===
  variant?: DropdownVariant;
  customTheme?: CustomTheme;
}

/**
 * Proveedor del contexto de dropdown.
 * Utiliza el hook `useDropdown` para obtener toda la lógica de estado e interacción.
 * Las props se pasan directamente a `useDropdown` y también se usan para valores estáticos.
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,

  // Datos y contenido
  menuItems,
  loading = false,
  loadingText = "Cargando...",
  emptyState,

  // Comportamiento
  onItemClick,
  onHoverItem,
  onOpen,
  onClose,
  maxDepth = 5,
  openOnHover = true,
  closeOnClickOutside = true,
  closeDelay = 300,

  // Estilos y diseño
  sx,
  paperSx,
  itemSx,
  submenuSx,
  density = "standard",
  showDividers = false,
  dividerColor = "divider",

  // Iconos
  expandIcon = <ChevronRightIcon sx={{ fontSize: 16 }} />, // Placeholder
  collapseIcon = <ChevronLeftIcon sx={{ fontSize: 16 }} />, // Placeholder
  submenuIcon,
  iconPosition = "end",

  // Comportamiento avanzado
  open: controlledOpen,
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
  renderItem,
  renderSubmenu,

  // Temas
  variant = "default",
  customTheme,
}) => {
  // Hook principal que contiene toda la lógica de negocio
  const {
    isOpen,
    activePath,
    setIsOpen,
    setActivePath,
    handleMouseEnter,
    handleMouseLeave,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleItemClick,
    getItemDepth,
    buildItemUrl,
    itemHasChildren,
    getItemByPath,
    getBaseHrefForPath,
    timeoutRef,
  } = useDropdown({
    defaultOpen,
    closeDelay,
    openOnHover,
    closeOnClickOutside,
    onOpen,
    onClose,
    menuItems,
    onItemClick,
    onHoverItem,
    scrollOffset,
    disabled,
    readOnly,
  });

  // Determina si el menú está abierto (modo controlado o no)
  const isOpenFinal = controlledOpen !== undefined ? controlledOpen : isOpen;
  const setIsOpenFinal = controlledOpen !== undefined ? () => {} : setIsOpen;

  // --- Funciones de estilo (solo esqueleto) ---
  const getDensityStyles = useCallback(() => {
    // Retorna estilos según la densidad (compact, standard, comfortable)
    switch (density) {
      case "compact":
        return { py: 0.5, fontSize: "0.75rem", minHeight: 32 };
      case "comfortable":
        return { py: 2, fontSize: "0.875rem", minHeight: 64 };
      default: // standard
        return { py: 1, fontSize: "0.875rem", minHeight: 48 };
    }
  }, [density]);

  const getVariantStyles = () => {
    // Retorna estilos según la variante (default, minimal, elevated, etc.)
    return {};
  };

  // --- Componentes de estado (vacíos, solo estructura) ---
  const LoadingState = () => (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress size={24} />
      <Typography variant="body2" color="text.secondary">
        {loadingText}
      </Typography>
    </Box>
  );

  const EmptyStateComponent = () => {
    if (emptyState) return <>{emptyState}</>;
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {translations?.empty || "No hay elementos"}
        </Typography>
      </Box>
    );
  };

  // --- Valor del contexto ---
  const contextValue: DropdownContextType = {
    // Estado
    isOpen: isOpenFinal,
    activePath,
    setIsOpen: setIsOpenFinal,
    setActivePath,

    // Interacción
    handleMouseEnter,
    handleMouseLeave,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleItemClick,
    getItemDepth,
    buildItemUrl,
    itemHasChildren,

    // Datos
    menuItems: loading ? [] : menuItems,
    loading,
    loadingText,
    emptyState,
    onItemClick,
    onHoverItem,
    maxDepth,
    getItemByPath,
    getBaseHrefForPath,

    // Estilos
    paperSx: { ...getVariantStyles(), ...paperSx },
    itemSx,
    submenuSx,
    density,
    showDividers,
    dividerColor,
    getDensityStyles,

    // Iconos
    expandIcon,
    collapseIcon,
    submenuIcon: submenuIcon || expandIcon,
    iconPosition,

    // Comportamiento
    openOnHover,
    closeDelay,
    scrollIntoView,
    scrollOffset,
    scrollBehavior,
    disabled,
    readOnly,
    initialDepth,
    autoExpandDepth,

    // Accesibilidad
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    role,
    keyboardNavigation,
    focusOnOpen,
    useAnchorTags,
    rel,

    // Internacionalización
    translations,
    direction: direction || "ltr",

    // Renderizado personalizado
    renderItem,
    renderSubmenu,

    // Temas
    variant,
    customTheme,

    // Componentes de estado
    LoadingState,
    EmptyState: EmptyStateComponent,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <Box
        data-dropdown-root
        sx={[
          { position: "relative", display: "inline-block", direction },
          ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
        ]}
        onMouseEnter={openOnHover ? handleMouseEnter : undefined}
        onMouseLeave={openOnHover ? handleMouseLeave : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        role={role}
      >
        {children}
      </Box>
    </DropdownContext.Provider>
  );
};
