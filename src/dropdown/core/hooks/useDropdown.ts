import { useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropdownState } from "./useDropdownState";
import { useHover } from "./useHover";
import { useClickOutside } from "./useClickOutside";
import { useScroll } from "./useScroll";
import { useItemNavigation } from "./useItemNavigation";
import { useKeyboardNavigation } from "./useKeyboardNavigation";
import type { MenuItem } from "../types";

interface UseDropdownProps {
  defaultOpen?: boolean;
  closeDelay?: number;
  openOnHover?: boolean;
  closeOnClickOutside?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  menuItems: MenuItem[];
  onItemClick?: (item: MenuItem, path: number[]) => void;
  onHoverItem?: (item: MenuItem, path: number[]) => void;
  scrollOffset?: number;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * Hook principal que orquesta todos los submódulos de comportamiento del dropdown.
 * Expone el estado y los manejadores necesarios para el contexto.
 */
export const useDropdown = (props: UseDropdownProps) => {
  const {
    defaultOpen = false,
    closeDelay = 300,
    openOnHover = true,
    closeOnClickOutside = true,
    onOpen,
    onClose,
    menuItems,
    onItemClick,
    onHoverItem,
    scrollOffset = 80,
    disabled = false,
    readOnly = false,
  } = props;

  // --- Estado local ---
  const { isOpen, setIsOpen, activePath, setActivePath } =
    useDropdownState(defaultOpen);

  // --- React Router ---
  const navigate = useNavigate();
  const location = useLocation();

  // --- Scroll suave ---
  const { scrollToElement, scrollToTop } = useScroll();

  // --- Interacción hover ---
  const {
    handleRootMouseEnter,
    handleRootMouseLeave,
    handleItemMouseEnter,
    handleItemMouseLeave,
    timeoutRef,
  } = useHover({
    openOnHover,
    closeDelay,
    onOpen,
    onClose,
    setIsOpen,
    setActivePath,
  });

  // --- Referencia al elemento raíz (para click outside) ---
  const rootRef = useRef<HTMLElement>(null);

  // --- Click fuera del dropdown ---
  useClickOutside({
    isOpen,
    closeOnClickOutside,
    setIsOpen,
    rootRef,
  });

  // --- Lógica de navegación y clicks en items ---
  const {
    getItemByPath,
    getBaseHrefForPath,
    buildItemUrl,
    handleItemClick,
    handleHoverItem,
  } = useItemNavigation({
    menuItems,
    onItemClick,
    onHoverItem,
    setIsOpen,
    setActivePath,
    activePath,
    navigate,
    locationPathname: location.pathname,
    scrollToElement,
    scrollOffset,
    disabled,
    readOnly,
  });

  // --- Navegación por teclado ---
  useKeyboardNavigation({
    isOpen,
    activePath,
    menuItems,
    onItemSelect: handleItemClick,
    onClose: () => setIsOpen(false),
    rootRef,
    enabled: true, // Podría venir de una prop
  });

  // --- Utilidades simples ---
  const getItemDepth = useCallback((path: number[]) => path.length, []);
  const itemHasChildren = useCallback((item: MenuItem): boolean => {
    return Boolean(item.children && item.children.length > 0);
  }, []);

  return {
    // Estado
    isOpen,
    activePath,
    setIsOpen,
    setActivePath,

    // Hover
    handleMouseEnter: handleRootMouseEnter,
    handleMouseLeave: handleRootMouseLeave,
    handleItemMouseEnter,
    handleItemMouseLeave,

    // Click en items
    handleItemClick,

    // Navegación
    getItemByPath,
    getBaseHrefForPath,
    buildItemUrl,

    // Utilidades
    getItemDepth,
    itemHasChildren,

    // Timeout (expuesto por si se necesita)
    timeoutRef,
  };
};
