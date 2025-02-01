// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  compatibilityDate: "2025-01-31",
  modules: ["@nuxtjs/tailwindcss"]
})