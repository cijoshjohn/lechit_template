/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineFlatConfig } from 'eslint-define-config';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineFlatConfig([
  js.configs.recommended, // Basic JS recommended rules.
  ...tseslint.configs.recommendedTypeChecked, // Uses the recommended type-checked rules from typescript-eslint.
  eslintPluginPrettierRecommended, // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. This should be specified after other imported configurations.
  { ignores: ['dist', '.prettierrc.cjs'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      reactPlugin, // Uses the recommended rules from eslint-plugin-react
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      // React is not required in scope v17 onwards, but eslint keeps failing
      // https://stackoverflow.com/questions/64646248/eslintrc-js-for-react-17-and-jsx-without-import-react/64646593#64646593
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-function': [1, { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'prefer-const': 'off',
    },
  },
]);
