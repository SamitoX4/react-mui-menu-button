import { useState } from "react";

/**
 * Hook base para gestionar el estado local del dropdown.
 *
 * - `isOpen`: indica si el menú principal está visible.
 * - `setIsOpen`: función para cambiar el estado de apertura.
 * - `activePath`: array de índices que representa la ruta del submenú actualmente activo (hover o click).
 * - `setActivePath`: función para actualizar la ruta activa.
 */
export const useDropdownState = (defaultOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activePath, setActivePath] = useState<number[] | null>(null);

  return {
    isOpen,
    setIsOpen,
    activePath,
    setActivePath,
  };
};
