import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import json from '@eslint/json'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Archivos e ignorados
  {
    ignores: ['dist/**', 'node_modules/**']
  },

  // Base JS
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser }
  },

  // TypeScript
  ...tseslint.configs.recommended,

  // React/Preact base
  {
    files: ['src/**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: '16.0'
      }
    }
  },

  // Archivos JSON
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  },

  // Reglas personalizadas + Stylistic + React rules
  {
    files: ['src/**/*.{js,jsx,ts,tsx}', 'eslint.config.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: new URL('.', import.meta.url).pathname
      }
    },
    plugins: {
      '@stylistic': stylistic,
      react: pluginReact
    },
    rules: {
      'no-empty-pattern': 'off',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'space-before-function-paren': ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['class'] }]
    }
  }
])
