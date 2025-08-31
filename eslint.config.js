import js from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importX from "eslint-plugin-import-x";

import prettierRecommend from "eslint-plugin-prettier/recommended";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsdoc from "eslint-plugin-tsdoc";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  // tseslint.configs.recommendedTypeChecked,
  prettierRecommend,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: { ...globals.browser },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        projectService: true
      }
    },
    plugins: {
      tsdoc,
      "@typescript-eslint": tseslint.plugin,
      "import-x": importX,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      "tsdoc/syntax": "warn",
      "prefer-const": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "unknown",
            "parent",
            "sibling",
            "index",
            "object",
            "type"
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: false
          }
        }
      ]
    },
    settings: {
      "import/resolver-next": [
        createTypeScriptImportResolver({
          // bun: true,
          alwaysTryTypes: true,
          extensions: [
            ".js",
            ".cjs",
            ".mjs",
            ".jsx",
            ".ts",
            ".cjs",
            ".cts",
            ".mts",
            ".tsx",
            ".json"
          ]
        })
      ]
    }
  }
);
