/**
 * @Source [https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md]
 * 
 * @Source [https://github.com/mysticatea/eslint-plugin-node]
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ]
};