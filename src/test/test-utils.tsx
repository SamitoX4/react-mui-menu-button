import React, { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Renderiza un componente envuelto en BrowserRouter para pruebas con React Router.
 * @param ui - Componente a renderizar
 * @param options - Opciones adicionales para render
 * @returns El resultado de render con los queries estándar
 */
const customRender = (ui: ReactElement, options = {}): RenderResult =>
  render(ui, { wrapper: BrowserRouter, ...options });

// Re-exportar todo desde testing-library para usar directamente en los tests
export * from '@testing-library/react';
export { customRender as render };