module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [],
  rules: {
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
  },
};
