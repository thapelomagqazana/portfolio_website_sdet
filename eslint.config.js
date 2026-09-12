import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    'dist',
    'coverage',
    'playwright-report',
    'test-results',
    'node_modules',
  ]),

  // 1. Test files — Vitest globals; relax no-unsafe-* rules
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}', 'src/tests/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // 2. React app source — full strict rules, excludes test files
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.{test,spec}.{ts,tsx}', 'src/tests/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
    },
  },

  // 3. TypeScript config files — type-aware
  {
    files: ['vite.config.ts', 'playwright.config.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // 4. JavaScript config files — NOT type-aware
  {
    files: ['*.config.js', 'postcss.config.js'],
    extends: [js.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
    },
  },

  // 5. E2E tests — type-aware
  {
    files: ['tests/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
]);
