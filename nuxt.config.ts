// @ts-nocheck
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-02',

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils',
    '@nuxt/eslint',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    'nuxt-tiptap-editor',
  ],
  buildModules: ['@nuxtjs/svg'],

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },

  routeRules: {
    '/': { redirect: '/tasks' },
    '/en': { redirect: '/tasks' },
    '/ru': { redirect: '/tasks' },
    '/tasks': { ssr: true },
    '/auth': { ssr: true },
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'prefix',
    locales: ['ru', 'en'],
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
  },
})