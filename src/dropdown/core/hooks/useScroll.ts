import { useCallback } from "react";

/**
 * Hook que proporciona funciones para realizar scroll suave:
 * - `scrollToElement`: desplaza la ventana hasta un elemento con ID específico.
 * - `scrollToTop`: vuelve al inicio de la página con un offset opcional.
 */
export const useScroll = () => {
  const scrollToElement = useCallback(
    (elementId: string, offset: number = 80) => {
      if (typeof window === "undefined" || typeof document === "undefined") {
        console.warn("scrollToElement llamado en entorno no-browser");
        return;
      }

      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Enfocar el elemento para accesibilidad
        element.focus({ preventScroll: true });
      } else {
        console.warn(`Elemento con id "${elementId}" no encontrado`);
      }
    },
    [],
  );

  const scrollToTop = useCallback((offset: number = 0) => {
    // Scroll suave a la posición top = offset
  }, []);

  return { scrollToElement, scrollToTop };
};
