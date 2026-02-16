import { useEffect, RefObject } from "react";

interface UseClickOutsideProps {
  isOpen: boolean;
  closeOnClickOutside?: boolean;
  setIsOpen: (open: boolean) => void;
  rootRef: RefObject<HTMLElement | null>;
}

/**
 * Hook que escucha clics fuera del componente raíz y cierra el menú.
 * Respetar la prop `closeOnClickOutside` (true por defecto).
 */
export const useClickOutside = ({
  isOpen,
  closeOnClickOutside = true,
  setIsOpen,
  rootRef,
}: UseClickOutsideProps) => {
  useEffect(() => {
    if (!closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      // 1. Verificar si rootRef.current existe y NO contiene el target del evento
      // 2. Si el clic fue fuera, llamar setIsOpen(false)
    };

    // Agregar event listener en 'mousedown' o 'click'
    // Remover listener en la limpieza
  }, [isOpen, closeOnClickOutside, setIsOpen, rootRef]);
};
