import React, { ReactElement } from "react";
import { render, RenderOptions } from "../test-utils"; // el nuestro que ya tiene BrowserRouter
import { DropdownContext } from "../../dropdown/core/context/DropdownContext";
import type { DropdownContextType } from "../../dropdown/core/types";
import { vi } from "vitest";

// Mock de valores por defecto para el contexto
const defaultContextValue: DropdownContextType = {
  isOpen: true,
  activePath: null,
  setIsOpen: vi.fn(),
  setActivePath: vi.fn(),
  handleMouseEnter: vi.fn(),
  handleMouseLeave: vi.fn(),
  handleItemMouseEnter: vi.fn(),
  handleItemMouseLeave: vi.fn(),
  handleItemClick: vi.fn(),
  getItemDepth: vi.fn().mockReturnValue(0),
  buildItemUrl: vi.fn().mockReturnValue("#"),
  itemHasChildren: vi.fn().mockReturnValue(false),
  menuItems: [],
  loading: false,
  loadingText: "Cargando...",
  emptyState: null,
  onItemClick: vi.fn(),
  onHoverItem: vi.fn(),
  maxDepth: 5,
  getItemByPath: vi.fn().mockReturnValue(null),
  getBaseHrefForPath: vi.fn().mockReturnValue("/"),
  paperSx: {},
  itemSx: {},
  submenuSx: {},
  density: "standard",
  showDividers: false,
  dividerColor: "divider",
  getDensityStyles: vi.fn().mockReturnValue({ py: 1, fontSize: "0.875rem" }),
  expandIcon: <span>expand</span>,
  collapseIcon: <span>collapse</span>,
  submenuIcon: <span>submenu</span>,
  iconPosition: "end",
  openOnHover: true,
  closeDelay: 300,
  scrollIntoView: true,
  scrollOffset: 80,
  scrollBehavior: "smooth",
  disabled: false,
  readOnly: false,
  initialDepth: 0,
  autoExpandDepth: 0,
  ariaLabel: "menu",
  ariaLabelledBy: undefined,
  ariaDescribedBy: undefined,
  role: "menu",
  keyboardNavigation: true,
  focusOnOpen: true,
  useAnchorTags: true,
  rel: undefined,
  translations: undefined,
  direction: "ltr",
  renderItem: undefined,
  renderSubmenu: undefined,
  variant: "default",
  customTheme: undefined,
  LoadingState: () => <div>Loading...</div>,
  EmptyState: () => <div>Empty</div>,
};

interface RenderWithContextOptions extends RenderOptions {
  contextValue?: Partial<DropdownContextType>;
}

export function renderWithContext(
  ui: ReactElement,
  { contextValue = {}, ...options }: RenderWithContextOptions = {},
) {
  const mergedContext = {
    ...defaultContextValue,
    ...contextValue,
  } as DropdownContextType;
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <DropdownContext.Provider value={mergedContext}>
      {children}
    </DropdownContext.Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}
