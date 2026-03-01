# React Menu Button MUI

[![npm version](https://badge.fury.io/js/react-mui-menu-button.svg)](https://www.npmjs.com/package/react-mui-menu-button)

Menú desplegable recursivo con soporte para múltiples niveles,
navegación, scroll suave y total personalización. Construido sobre
**Material UI** y **React Router**.

---

## Componente para su uso en dos temas

| Modo claro                                                                                        | Modo oscuro                                                                                      |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ![Menú blanco](https://cdn.jsdelivr.net/gh/SamitoX4/react-mui-menu-button@master/white_menu.png) | ![Menú negro](https://cdn.jsdelivr.net/gh/SamitoX4/react-mui-menu-button@master/black_menu.png) |

---

## 📦 Instalación

```bash
npm install react-mui-menu-button
# o
yarn add react-mui-menu-button
# o
pnpm add react-mui-menu-button
```

### Dependencias necesarias (peer dependencies)

Asegúrate de tener instaladas las siguientes librerías en tu proyecto:

``` txt
react >= 17.0.0
react-dom >= 17.0.0
@mui/material >= 5.0.0
@mui/icons-material >= 5.0.0
@emotion/react >= 11.0.0
@emotion/styled >= 11.0.0
react-router-dom >= 6.0.0
```

---

## 🚀 Uso básico

```tsx
import { DropdownWithSubmenu } from "react-mui-menu-button";
import { menuItems } from "./menuData"; // tu array de MenuItem

function App() {
  return <DropdownWithSubmenu menuItems={menuItems} triggerText="Explorar" />;
}
```

---

## 📘 Estructura de datos (MenuItem)

Cada ítem del menú sigue la interfaz:

```ts
interface MenuItem {
  label: string; // Texto visible
  href?: string; // Ruta de navegación (React Router)
  hash?: string; // Ancla para scroll interno (sin #)
  icon: React.ReactNode; // Icono (elemento JSX)
  children?: MenuItem[]; // Subítems anidados
}
```

- ✅ Puedes combinar `href` y `hash`.
- ✅ Si solo usas `hash`, se tomará el `href` del ancestro más cercano
  como base.
- ✅ Ítems sin `href/hash` y sin hijos → no hacen nada al hacer clic.
- ✅ Ítems sin `href/hash` pero con hijos → expanden/colapsan el
  submenú.

---

## 🧱 Ejemplo rápido de estructura **menuItems**

```tsx
import type { MenuItem } from "react-mui-menu-button";
import {
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Article as ArticleIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export const menuItems: MenuItem[] = [
  {
    label: "Portafolio Técnico",
    href: "/portfolio",
    icon: <CodeIcon />,
    children: [
      {
        label: "Proyectos Open Source",
        hash: "open-source",
        icon: <GitHubIcon />,
        children: [
          {
            label: "React Components",
            hash: "react-components",
            icon: <CodeIcon />,
            children: [
              {
                label: "Componentes Avanzados",
                hash: "advanced-components",
                icon: <CodeIcon />,
              },
              {
                label: "Hooks Personalizados",
                hash: "custom-hooks",
                icon: <CodeIcon />,
              },
            ],
          },
          {
            label: "Node.js Libraries",
            hash: "node-libraries",
            icon: <CodeIcon />,
          },
          {
            label: "UI Kits",
            hash: "ui-kits",
            icon: <CodeIcon />,
          },
        ],
      },
      {
        label: "Demos Interactivas",
        hash: "demos",
        icon: <CodeIcon />,
        children: [
          {
            label: "Animaciones Web",
            hash: "web-animations",
            icon: <CodeIcon />,
          },
          {
            label: "APIs REST",
            hash: "rest-apis",
            icon: <CodeIcon />,
          },
        ],
      },
      {
        label: "Casos de Estudio",
        hash: "case-studies",
        icon: <ArticleIcon />,
      },
      {
        label: "Repositorios GitHub",
        hash: "repositories",
        icon: <GitHubIcon />,
      },
    ],
  },
  {
    label: "Emprendimientos",
    href: "/ventures",
    icon: <BusinessIcon />,
    children: [
      {
        label: "Puertas & Portones",
        hash: "doors-gates",
        icon: <BusinessIcon />,
        children: [
          {
            label: "Modelos Estándar",
            hash: "standard-models",
            icon: <BusinessIcon />,
          },
          {
            label: "Medidas Personalizadas",
            hash: "custom-measures",
            icon: <BusinessIcon />,
          },
        ],
      },
      {
        label: "Catálogo de Productos",
        hash: "catalog",
        icon: <BusinessIcon />,
      },
      {
        label: "Diseños Personalizados",
        hash: "designs",
        icon: <BusinessIcon />,
      },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    icon: <ArticleIcon />,
  },
  {
    label: "Perfil",
    href: "/",
    icon: <PersonIcon />,
    children: [
      {
        label: "Stack Tecnológico",
        hash: "technology-stack",
        icon: <CodeIcon />,
      },
      {
        label: "Experiencia Laboral",
        hash: "experience",
        icon: <PersonIcon />,
      },
    ],
  },
];
```

---

## 🧩 Props principales

### 1. Datos y contenido

| Prop        | Tipo                      | Default          | Descripción                           |
| ----------- | ------------------------- | ---------------- | ------------------------------------- |
| menuItems   | MenuItem[]                | defaultMenuItems | Array de ítems del menú               |
| loading     | boolean                   | false            | Muestra estado de carga               |
| loadingText | string                    | "Cargando..."    | Texto del spinner                     |
| emptyState  | React.ReactNode           | undefined        | Componente cuando no hay ítems        |
| triggerText | string \| React.ReactNode | "EXPLORAR"       | Texto o elemento del botón disparador |
| triggerIcon | React.ReactNode           | undefined        | Icono que acompaña al texto del botón |

### 2. Comportamiento

| Prop                | Tipo                 | Default | Descripción                       |
| ------------------- | -------------------- | ------- | --------------------------------- |
| onItemClick         | (item, path) => void | -       | Callback al hacer clic en un ítem |
| onHoverItem         | (item, path) => void | -       | Callback al pasar el mouse        |
| onOpen              | () => void           | -       | Al abrir el menú                  |
| onClose             | () => void           | -       | Al cerrar el menú                 |
| maxDepth            | number               | 5       | Profundidad máxima                |
| openOnHover         | boolean              | true    | Abrir con hover                   |
| closeOnClickOutside | boolean              | true    | Cerrar al hacer clic fuera        |
| closeDelay          | number (ms)          | 300     | Retraso para cerrar               |

### 3. Estilos y diseño

| Prop         | Tipo                               | Default  | Descripción            |
| ------------ | ---------------------------------- | -------- | ---------------------- |
| sx           | SxProps<Theme>                     | -        | Estilos del contenedor |
| paperSx      | SxProps<Theme>                     | -        | Estilos del Paper      |
| itemSx       | SxProps<Theme>                     | -        | Estilos del ítem       |
| submenuSx    | SxProps<Theme>                     | -        | Estilos del submenú    |
| density      | compact \| standard \| comfortable | standard | Densidad vertical      |
| showDividers | boolean                            | false    | Mostrar separadores    |
| dividerColor | string                             | divider  | Color del divisor      |

### 4. Iconos

| Prop         | Tipo                 | Default         | Descripción        |
| ------------ | -------------------- | --------------- | ------------------ |
| expandIcon   | React.ReactNode      | ChevronRight    | Submenú cerrado    |
| collapseIcon | React.ReactNode      | ArrowDropUpIcon | Submenú abierto    |
| submenuIcon  | React.ReactNode      | expandIcon      | Icono del submenú  |
| iconPosition | start \| end \| none | end             | Posición del icono |

### 5. Comportamiento avanzado

| Prop            | Tipo           | Default | Descripción         |
| --------------- | -------------- | ------- | ------------------- |
| open            | boolean        | -       | Control externo     |
| defaultOpen     | boolean        | false   | Estado inicial      |
| initialDepth    | number         | 0       | Profundidad inicial |
| autoExpandDepth | number         | 0       | Auto expansión      |
| scrollIntoView  | boolean        | true    | Scroll por hash     |
| scrollOffset    | number         | 80      | Offset              |
| scrollBehavior  | auto \| smooth | smooth  | Tipo de scroll      |
| disabled        | boolean        | false   | Deshabilitado       |
| readOnly        | boolean        | false   | Solo lectura        |

### 6. Accesibilidad y SEO

| Prop               | Tipo    | Default          | Descripción        |
| ------------------ | ------- | ---------------- | ------------------ |
| ariaLabel          | string  | Menú desplegable | aria-label         |
| ariaLabelledBy     | string  | -                | Etiqueta           |
| ariaDescribedBy    | string  | -                | Descripción        |
| role               | string  | menu             | Rol ARIA           |
| keyboardNavigation | boolean | true             | Navegación teclado |
| focusOnOpen        | boolean | true             | Foco inicial       |
| useAnchorTags      | boolean | true             | Usa `<a>`          |
| rel                | string  | -                | Atributo rel       |

### 7. Internacionalización

| Prop         | Tipo                 | Default | Descripción |
| ------------ | -------------------- | ------- | ----------- |
| translations | DropdownTranslations | -       | Textos      |
| direction    | ltr \| rtl           | ltr     | Dirección   |

### 8. Renderizado personalizado

| Prop          | Tipo                       | Descripción           |
| ------------- | -------------------------- | --------------------- |
| renderTrigger | (props) => React.ReactNode | Trigger personalizado |
| renderItem    | (props) => React.ReactNode | Ítem personalizado    |
| renderSubmenu | (props) => React.ReactNode | Submenú personalizado |

### 9. Temas y variantes

| Prop        | Tipo                                                             | Default | Descripción        |
| ----------- | ---------------------------------------------------------------- | ------- | ------------------ |
| variant     | default \| minimal \| elevated \| borderless \| dark \| gradient | default | Variante visual    |
| customTheme | CustomTheme                                                      | -       | Tema personalizado |

---

---

## 🎨 Ejemplos avanzados

### Menú con apertura por click

```tsx
<DropdownWithSubmenu
  menuItems={menuItems}
  openOnHover={false}
  closeOnClickOutside={true}
/>
```

### Densidad compacta

```tsx
<DropdownWithSubmenu
  menuItems={menuItems}
  density="compact"
  iconPosition="none"
/>
```

### Tema oscuro

```tsx
<DropdownWithSubmenu
  menuItems={menuItems}
  variant="dark"
  customTheme={{
    colors: { background: "#1e1e2f", text: "#ffffff" },
    borderRadius: 8,
    spacing: 1,
  }}
/>
```

### Trigger personalizado

```tsx
<DropdownWithSubmenu
  menuItems={menuItems}
  renderTrigger={({ isOpen, toggle, ref }) => (
    <button ref={ref} onClick={toggle} className="mi-boton">
      {isOpen ? "Cerrar" : "Abrir"} menú
    </button>
  )}
/>
```

### Enlaces reales para SEO

```tsx
<DropdownWithSubmenu
  menuItems={menuItems}
  useAnchorTags={true}
  rel="noopener noreferrer"
/>
```

---

## ♿ Accesibilidad

- Rol `menu` / `menuitem`
- Navegación por teclado
- Atributos ARIA
- Lectores de pantalla

---

## 📐 TypeScript

```ts
import type {
  MenuItem,
  DropdownVariant,
  DropdownDensity,
  IconPosition,
  ScrollBehavior,
  CustomTheme,
  DropdownTranslations,
  DropdownWithSubmenuProps,
} from "recursive-dropdown-mui";
```

---

## 🛠️ Desarrollo local

1.  Clona el repositorio\
2.  Instala dependencias: `pnpm install`\
3.  Construye: `pnpm build`\
4.  Dev: `pnpm dev`

---

## 📄 Licencia

MIT © BlackyCoder
