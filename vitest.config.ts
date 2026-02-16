import { defineConfig } from "vitest/config";
import pluginReact from "@vitejs/plugin-react";
import "@testing-library/jest-dom/vitest";
console.log('✅ Setup de testing ejecutado')

export default defineConfig({
  plugins: [pluginReact() as any], // Necesario para transformar JSX
  test: {
    // Entorno de pruebas (jsdom simula el navegador)
    environment: "jsdom",

    // Archivo de setup que se ejecuta antes de cada test
    setupFiles: ["./src/test/setup.ts"],

    // Incluir archivos de test (patrón glob)
    include: ["src/**/*.{test,spec}.{ts,tsx}"],

    // Excluir carpetas de node_modules y build
    exclude: ["node_modules", "dist"],

    // Reporte de cobertura
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"], // text para consola, html para visualizar en navegador
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{ts,tsx}",
        "src/test/**/*",
        "node_modules/**",
        "dist/**",
        "coverage/**",
      ],
    },

    // Modo global (no recomendado, mejor importar explícitamente)
    globals: true,

    // Si tu código usa `import.meta.env`, puedes definir variables aquí
    // env: { ... },
  },
});
