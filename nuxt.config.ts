// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'My Nuxt PWA',
            short_name: 'NuxtPWA',
            description: 'My awesome Nuxt PWA!',
            theme_color: '#ffffff',
            icons: [
                {
                    src: '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        },
        workbox: {
        },
    },

    compatibilityDate: "2025-01-31",
    modules: ["@nuxtjs/tailwindcss", '@vite-pwa/nuxt']
})