module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import", "react-hooks", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:react-hooks/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "no-console": "error",
    "import/prefer-default-export": "off",
    "@typescript-eslint/interface-name-prefix": "on",
    "@typescript-eslint/explicit-function-return-type": "on",
    "@typescript-eslint/explicit-module-boundary-types": "on",
    "@typescript-eslint/no-explicit-any": "on",
    "react/react-in-jsx-scope": "off",
  },
};
