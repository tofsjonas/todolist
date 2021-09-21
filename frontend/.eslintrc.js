module.exports = {
  root: true,
  extends: [
    //
    // "react-app",
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],

  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    // indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    camelcase: [0],
    'react/prop-types': [0],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'no-unreachable': 'warn',
  },
  plugins: ['react', 'prettier'],
  // parser: "babel-eslint",
}
