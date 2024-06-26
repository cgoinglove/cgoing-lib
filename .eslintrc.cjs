module.exports = {
  root: true,
  env: { browser: true, es2020: true,node:true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
  },
};
