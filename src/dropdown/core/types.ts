import { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface MenuItem {
  label: string;
  href?: string;
  hash?: string;
  icon: ReactNode;
  children?: MenuItem[];
}

export interface DropdownContextType {
  // Estado del dropdown
  isOpen: boolean;
  activePath: number[] | null;
  setIsOpen: (open: boolean) => void;
  setActivePath: (path: number[] | null) => void;

  // Funciones de interacción
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleItemMouseEnter: (path: number[]) => void;
  handleItemMouseLeave: () => void;
  handleItemClick: (item: MenuItem, itemPath: number[]) => void;
  getItemDepth: (path: number[]) => number;
  buildItemUrl: (item: MenuItem, baseHref?: string) => string;
  itemHasChildren: (item: MenuItem) => boolean;

  // Datos y contenido
  menuItems: MenuItem[];
  loading?: boolean;
  loadingText?: string;
  emptyState?: React.ReactNode;
  onItemClick?: (item: MenuItem, path: number[]) => void;
  onHoverItem?: (item: MenuItem, path: number[]) => void;
  maxDepth: number;
  getItemByPath: (path: number[]) => MenuItem | null;
  getBaseHrefForPath: (path: number[]) => string;

  // Estilos y diseño
  paperSx?: any;
  itemSx?: any;
  submenuSx?: any;
  density: DropdownDensity;
  showDividers: boolean;
  dividerColor: string;
  getDensityStyles: () => any;

  // Iconos
  expandIcon: React.ReactNode;
  collapseIcon: React.ReactNode;
  submenuIcon: React.ReactNode;
  iconPosition: IconPosition;

  // Comportamiento
  openOnHover: boolean;
  closeDelay: number;
  scrollIntoView: boolean;
  scrollOffset: number;
  scrollBehavior: ScrollBehavior;
  disabled: boolean;
  readOnly: boolean;
  initialDepth: number;
  autoExpandDepth: number;

  // Accesibilidad
  ariaLabel: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role: string;
  keyboardNavigation: boolean;
  focusOnOpen: boolean;
  useAnchorTags: boolean;
  rel?: string;

  // Internacionalización
  translations?: DropdownTranslations;
  direction: "ltr" | "rtl";

  // Renderizado personalizado
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

  // Temas
  variant: DropdownVariant;
  customTheme?: CustomTheme;

  // Componentes de estado
  LoadingState: React.FC;
  EmptyState: React.FC;
}

export type DropdownVariant =
  | "default"
  | "minimal"
  | "elevated"
  | "borderless"
  | "dark"
  | "gradient";

export type DropdownDensity = "compact" | "standard" | "comfortable";
export type IconPosition = "start" | "end" | "none";
export type ScrollBehavior = "auto" | "smooth";

export interface CustomTheme {
  text?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
  };
  spacing?: number;
  borderRadius?: number;
}

export interface DropdownTranslations {
  expand?: string;
  collapse?: string;
  loading?: string;
  empty?: string;
}

export interface DropdownWithSubmenuProps {
  // === 1. DATOS Y CONTENIDO ===
  menuItems?: MenuItem[];
  triggerText?: string | React.ReactNode;
  triggerIcon?: React.ReactNode;
  emptyState?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;

  // === 2. COMPORTAMIENTO ===
  onItemClick?: (item: MenuItem, path: number[]) => void;
  maxDepth?: number;
  openOnHover?: boolean;
  closeOnClickOutside?: boolean;
  closeDelay?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onHoverItem?: (item: MenuItem, path: number[]) => void;

  // === 3. ESTILOS MUI ===
  sx?: SxProps<Theme>;
  triggerSx?: SxProps<Theme>;
  paperSx?: SxProps<Theme>;
  itemSx?: SxProps<Theme>;
  submenuSx?: SxProps<Theme>;
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
  density?: DropdownDensity;

  // === 4. ICONOS ===
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  submenuIcon?: React.ReactNode;
  iconPosition?: IconPosition;
  showDividers?: boolean;
  dividerColor?: string;

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
  renderTrigger?: (props: {
    isOpen: boolean;
    toggle: () => void;
    ref: React.Ref<HTMLElement>;
  }) => React.ReactNode;
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
