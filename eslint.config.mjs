// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt(
  {
    settings: {
      'vue/setup-compiler-macros': true, // Включает поддержку `<script setup>`
    },

    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
    },

    rules: {
      semi: 'error',
      'prefer-const': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  eslintPluginPrettierRecommended
)
// Your custom configs here
