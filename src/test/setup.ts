// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock window.history.pushState si no existe
if (typeof window !== 'undefined' && !window.history.pushState) {
  window.history.pushState = vi.fn();
}

// Limpiar el DOM después de cada test
afterEach(() => {
  cleanup();
});
