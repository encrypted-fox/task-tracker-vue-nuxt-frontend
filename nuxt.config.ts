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
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils',
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  buildModules: ['@nuxtjs/svg'],
  routeRules: {
    '/auth': { prerender: true },
    '/auth/login': {
      redirect: { to: '/auth', statusCode: 302 },
    },
    '/auth/register': {
      redirect: { to: '/auth', statusCode: 302 },
    },
  },
})
