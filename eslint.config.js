import { fixupConfigRules } from "@eslint/compat";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsEslintPlugin from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["**/dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, "react-hooks": reactHooks, "react-refresh": reactRefresh },
    extends: [
      "js/recommended",
      ...fixupConfigRules(pluginImport.flatConfigs.recommended),
      ...fixupConfigRules(pluginImport.flatConfigs.typescript),
    ],
    languageOptions: { ecmaVersion: 2023, globals: globals.browser },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          // 定义导入分组
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          // 定义每组内的排序规则
          alphabetize: {
            order: "asc", // 按字母顺序升序排列
            caseInsensitive: true, // 不区分大小写
          },
        },
      ],
      "import/no-named-as-default-member": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./"],
        },
      },
    },
  },
  tsEslintPlugin.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
