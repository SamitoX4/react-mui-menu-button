import { useCallback } from "react";
import { MenuItem } from "../types";

interface UseItemNavigationProps {
  menuItems: MenuItem[];
  onItemClick?: (item: MenuItem, path: number[]) => void;
  onHoverItem?: (item: MenuItem, path: number[]) => void;
  setIsOpen: (open: boolean) => void;
  setActivePath: (path: number[] | null) => void;
  activePath: number[] | null;
  navigate: (url: string) => void;
  locationPathname: string;
  scrollToElement: (id: string, offset: number) => void;
  scrollOffset: number;
  disabled: boolean;
  readOnly: boolean;
}

/**
 * Hook que centraliza la lógica de navegación y expansión al hacer clic en un item.
 * También construye URLs, obtiene items por path y maneja el hover.
 */
export const useItemNavigation = ({
  menuItems,
  onItemClick,
  onHoverItem,
  setIsOpen,
  setActivePath,
  activePath,
  navigate,
  locationPathname,
  scrollToElement,
  scrollOffset,
  disabled,
  readOnly,
}: UseItemNavigationProps) => {
  /**
   * Recorre el árbol de menú según un array de índices y retorna el item encontrado.
   */
  const getItemByPath = useCallback(
    (path: number[]): MenuItem | null => {
      if (!path.length) return null;
      let current: any = menuItems;
      for (const index of path) {
        if (!current || !Array.isArray(current)) return null;
        current = current[index];
        if (!current) return null;
        // Si el nodo tiene hijos y aún quedan índices, avanzar a children
        if (current.children && path.length > 1) {
          current = current.children;
        }
      }
      return current as MenuItem;
    },
    [menuItems],
  );

  /**
   * Busca hacia arriba en el path el primer href disponible.
   * Útil para construir URLs relativas cuando el item solo tiene hash.
   */
  const getBaseHrefForPath = useCallback(
    (path: number[]): string => {
      // Recorrer el path de atrás hacia adelante hasta encontrar un item con href
      for (let i = path.length; i >= 0; i--) {
        const currentPath = path.slice(0, i);
        const item = getItemByPath(currentPath);
        if (item?.href) {
          return item.href;
        }
      }
      return "/";
    },
    [getItemByPath],
  );

  /**
   * Combina href, hash y baseHref para generar la URL completa.
   */
  const buildItemUrl = useCallback(
    (item: MenuItem, baseHref?: string): string => {
      let url = "";

      if (item.href) {
        url = item.href;
      } else if (baseHref) {
        url = baseHref;
      }

      if (item.hash) {
        url += `#${item.hash}`;
      }

      return url;
    },
    [],
  );

  /**
   * Ejecuta la acción principal al hacer clic en un item.
   * - Si tiene hijos: expande/contrae el submenú (alterna activePath).
   * - Si no tiene hijos: navega (React Router o scroll interno).
   * - Cierra el menú después de navegar.
   */
  const handleItemClick = useCallback(
    (item: MenuItem, itemPath: number[]) => {
      // ✅ 1. Respetar estado deshabilitado o solo lectura
      if (disabled || readOnly) return;

      // 2. Llamar al callback personalizado si existe
      if (onItemClick) {
        onItemClick(item, itemPath);
      }

      // 3. Determinar si el ítem tiene información de navegación
      const hasNavigation = Boolean(item.href || item.hash);

      if (hasNavigation) {
        // --- CASO 1: Navegación ---
        const baseHref = getBaseHrefForPath(itemPath);
        const itemUrl = buildItemUrl(item, baseHref);

        // Si solo tiene hash y no href, y estamos en la misma página base → scroll
        if (item.hash && !item.href) {
          if (locationPathname === baseHref) {
            scrollToElement(item.hash, scrollOffset);
            window.history.pushState(null, "", `#${item.hash}`);
          } else {
            navigate(`${baseHref}#${item.hash}`);
          }
        }
        // Si tiene href (con o sin hash)
        else if (item.href) {
          if (item.hash) {
            // Caso: href + hash
            if (locationPathname === item.href) {
              scrollToElement(item.hash, scrollOffset);
              window.history.pushState(null, "", `#${item.hash}`);
            } else {
              navigate(`${item.href}#${item.hash}`);
            }
          } else {
            // Solo href
            navigate(item.href);
          }
        }

        // Después de navegar, cerrar todo el menú y limpiar ruta activa
        setIsOpen(false);
        setActivePath(null);
        return;
      }

      // --- CASO 2: Sin navegación ---
      if (item.children && item.children.length > 0) {
        // Toggle del submenú
        const isActive = activePath?.join(",") === itemPath.join(",");
        if (isActive) {
          setActivePath(null); // colapsar
        } else {
          setActivePath(itemPath); // expandir
        }
      }
      // Si no tiene hijos ni navegación, no hacer nada (el menú permanece abierto)
    },
    [
      disabled,
      readOnly,
      onItemClick,
      getBaseHrefForPath,
      buildItemUrl,
      locationPathname,
      scrollToElement,
      scrollOffset,
      navigate,
      setIsOpen,
      setActivePath,
      activePath,
    ],
  );

  /**
   * Callback para hover sobre items (dispara onHoverItem).
   */
  const handleHoverItem = useCallback(
    (item: MenuItem, path: number[]) => {
      // Llamar onHoverItem si está definido
    },
    [onHoverItem],
  );

  return {
    getItemByPath,
    getBaseHrefForPath,
    buildItemUrl,
    handleItemClick,
    handleHoverItem,
  };
};
