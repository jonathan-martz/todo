/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    primary: "#1f6fed",
                    "primary-content": "white",
                    secondary: "black",
                    "secondary-content": "white",
                    accent: "black",
                    "accent-content": "white",
                    neutral: "white",
                    "neutral-content": "black",
                },
            },
        ],
    },
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
    ],
}

