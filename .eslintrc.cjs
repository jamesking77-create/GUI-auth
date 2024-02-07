module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      semi: ["error", "always"],
      indent: ["error", 2],
      quotes: ["error", "double"],
      "comma-dangle": ["error", "always-multiline"],
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
    },
  };
  