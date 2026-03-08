import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier";

export default withNuxt(
   {
      rules: {
         "no-console": "warn",
         "no-debugger": "warn",
      },
   },
   eslintConfigPrettier,
);
