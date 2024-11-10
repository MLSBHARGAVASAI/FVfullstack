import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18' }, // Set to React 18
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh, // Ensure it works with React Refresh in development only
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off', 
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off', 
      'react/jsx-uses-react': 'off', // No longer needed in React 17+ with JSX Transform
      'react/jsx-uses-vars': 'error', // Ensure that JSX elements are treated as variables
      'no-console': 'warn', // Warn about console logs in production
    },
    overrides: [
      {
        files: ['**/*.jsx'],
        rules: {
          'react/prop-types': 'off', // Optionally disable prop-types in JSX files if you're using TypeScript or prefer other validation
        },
      },
      {
        files: ['**/*.ts', '**/*.tsx'], // If you're working with TypeScript files
        rules: {
          'react/prop-types': 'off', // Turn off prop-types in TypeScript files
        },
      },
    ],
  },
]
