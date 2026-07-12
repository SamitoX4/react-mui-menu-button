import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',  // Cambiar esto si tu entry point es diferente
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      allowImportingTsExtensions: false,
      declaration: true,
      declarationDir: 'dist',
    }),
  ],
  external: (id) =>
    /^(react|react-dom|@mui\/.*|@emotion\/.*|react-router-dom)(\/.*)?$/.test(id),
};