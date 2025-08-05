export default [
  {
    ignores: ["dist", ".eslintrc.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        browser: true,
        es2020: true,
      },
    },
    plugins: {
      // react: require('eslint-plugin-react'),
      // 'react-refresh': require('eslint-plugin-react-refresh'),
    },
    settings: {
      react: { version: "18.2" },
    },
    rules: {
      // indent: ['error', 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
      // 'react/react-in-jsx-scope': 'off',
      // 'react/prop-types': 'off',
      "no-unused-vars": "off",
    },
    // Use "extends" as array of configs
    // extends: [
    //   'eslint:recommended',
    //   'plugin:react/recommended',
    //   'plugin:react/jsx-runtime',
    //   'plugin:react-hooks/recommended',
    // ],
  },
];
