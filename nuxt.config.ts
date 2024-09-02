// @ts-nocheck
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils',
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
  ],
  buildModules: ['@nuxtjs/svg'],
  
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    }
  },
  
  routeRules: {
    '/auth': { prerender: true },
  },
  
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default,
    strategy: 'prefix',
    locales: ['ru', 'en'],
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true
    }
  }
})