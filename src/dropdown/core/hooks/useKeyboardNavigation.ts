import { useEffect, RefObject } from "react";
import { MenuItem } from "../types";

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  activePath: number[] | null;
  menuItems: MenuItem[];
  onItemSelect: (item: MenuItem, path: number[]) => void;
  onClose: () => void;
  rootRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}

/**
 * Hook que implementa la navegación por teclado:
 * - Flechas arriba/abajo: movimiento vertical entre items del mismo nivel.
 * - Flecha derecha: abre submenú del item activo.
 * - Flecha izquierda: cierra submenú actual.
 * - Enter: selecciona el item activo.
 * - Escape: cierra todo el menú.
 */
export const useKeyboardNavigation = ({
  isOpen,
  activePath,
  menuItems,
  onItemSelect,
  onClose,
  rootRef,
  enabled = true,
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    if (!enabled || !isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Determinar el item activo según activePath
      // Calcular índices hermanos, padre, hijos
      // Prevenir scroll por defecto cuando corresponda
      // Ejecutar acciones según tecla
    };

    // Agregar event listener al documento o al rootRef
    // Limpiar al desmontar
  }, [isOpen, enabled, activePath, menuItems, onItemSelect, onClose, rootRef]);
};
