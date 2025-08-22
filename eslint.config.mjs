// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint'; // paquete "typescript-eslint" (v7+)

export default [
  // Reglas base JS
  js.configs.recommended,

  // Reglas base TypeScript (sin type-checking para ir ligeros)
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Si quisieras reglas con type-checking, añade:
        // projectService: true, // y asegúrate de tener tsconfig.json
      },
    },
    rules: {
      // tus reglas TS aquí
    },
  },

  // Ignorar la carpeta de build de Next
  {
    ignores: ['.next/**'],
  },
];
