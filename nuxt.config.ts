// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/icon-192.png' }
            ],
            title: 'Todos.Martz.cloud'
        }
    },

    compatibilityDate: "2025-01-31",
    modules: ["@nuxtjs/tailwindcss", '@vite-pwa/nuxt']
})