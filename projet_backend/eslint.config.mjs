import globals from "globals";
import pluginJs from "@eslint/js";
import js from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    ...pluginJs.configs.recommended,
    rules: {
      "complexity": ["error", 10],
      "max-depth": ["error", 4],
      "max-lines": ["error", 300],
      "max-lines-per-function": ["error", 50],
      "max-nested-callbacks": ["error", 3],
      "max-params": ["error", 6],
      "max-statements": ["error", 10],
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "getter-return": "error",
      "no-duplicate-imports": "error",
      "require-await": "error",
      "curly": "error",
    }
  }
];