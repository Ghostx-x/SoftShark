import * as js from "@eslint/js";
import * as globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      ...js.configs.recommended.rules,
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'object-curly-spacing': ['error', 'always']
    }

  },

  tseslint.configs.recommended
]);


