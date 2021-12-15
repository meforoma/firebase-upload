module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'comma-dangle': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react/function-component-definition': 0
  },
};
