const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-refresh'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': 'warn',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '**/atoms/*',
          '**/components/*',
          '**/constants/*',
          '**/layouts/*',
          '**/pages/*',
          '**/selectors/*',
          '**/services/*',
          '**/typings/*',
          '**/utils/*',
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
