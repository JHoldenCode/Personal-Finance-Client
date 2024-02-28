module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "jsx-a11y"],
  rules: {
    // Add your custom rules here
    indent: ["error", 2], // Use 2 spaces for indentation
    quotes: ["error", "double"], // Use single quotes
    semi: ["error", "always"], // Require semicolons

    // React specific rules
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": "off", // Disable prop-types as needed

    // Accessibility rules
    "jsx-a11y/accessible-emoji": "warn",
    // Add more rules as needed
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
