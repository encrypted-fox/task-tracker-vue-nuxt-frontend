import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/test-utils", "@unocss/nuxt", "@nuxt/eslint"],
  
  routeRules: {
    '/auth': { prerender: true },
    '/auth/login': {
      redirect: { to: '/auth', statusCode: 302 }
    },
    '/auth/register': {
      redirect: { to: '/auth', statusCode: 302 }
    }
  },
})
