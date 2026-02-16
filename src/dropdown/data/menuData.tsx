import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import type { MenuItem } from "../core/types";

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
