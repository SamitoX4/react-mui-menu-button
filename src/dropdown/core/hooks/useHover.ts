import { useRef, useCallback } from "react";

interface UseHoverProps {
  openOnHover?: boolean;
  closeDelay?: number;
  onOpen?: () => void;
  onClose?: () => void;
  setIsOpen: (open: boolean) => void;
  setActivePath: (path: number[] | null) => void;
}

/**
 * Hook que maneja toda la interacción por hover:
 * - Apertura/cierre del menú principal con delay configurable.
 * - Activación de submenús al pasar el ratón sobre items.
 * - Limpieza de timeouts para evitar cierres abruptos.
 */
export const useHover = ({
  openOnHover = true,
  closeDelay = 300,
  onOpen,
  onClose,
  setIsOpen,
  setActivePath,
}: UseHoverProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    // Limpia timeout pendiente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Limpia intervalo de conteo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleRootMouseEnter = useCallback(() => {
    if (!openOnHover) return;

    // Limpiar cualquier cierre programado
    clearTimers();

    onOpen?.();
    setIsOpen(true);
  }, [openOnHover, onOpen, setIsOpen, clearTimers]);

  const handleRootMouseLeave = useCallback(() => {
    if (!openOnHover) return;

    // Limpiar timers anteriores
    clearTimers();


    let elapsed = 0;
    const step = 100; // milisegundos por paso

    // Intervalo que imprime el progreso cada 100ms
    intervalRef.current = setInterval(() => {
      elapsed += step;
      if (elapsed <= closeDelay) {
      }
    }, step);

    // Timeout que ejecuta el cierre al llegar al delay
    timeoutRef.current = setTimeout(() => {
      clearTimers(); // limpia el intervalo cuando se cierra
      onClose?.();
      setIsOpen(false);
      setActivePath(null);
    }, closeDelay);
  }, [openOnHover, closeDelay, onClose, setIsOpen, setActivePath, clearTimers]);

  const handleItemMouseEnter = useCallback(
    (path: number[]) => {
      // Al entrar a un item, se cancela cualquier conteo de cierre
      clearTimers();
      setActivePath(path);
    },
    [setActivePath, clearTimers]
  );

  const handleItemMouseLeave = useCallback(() => {
    // Intencionalmente vacío
  }, []);

  return {
    handleRootMouseEnter,
    handleRootMouseLeave,
    handleItemMouseEnter,
    handleItemMouseLeave,
    timeoutRef,
    intervalRef,
  };
};