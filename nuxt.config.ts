// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "@/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  css: [
    "@/assets/css/tailwind.css",
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "primevue",
            "chart.js",
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
            "@headlessui/vue",
          ]
        : [
            "primevue",
            "chart.js",
            "@juggle/resize-observer",
            "@headlessui/vue",
          ],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
  },
  alias: {
    "firebase/analytics": "firebase/analytics/dist/index.mjs",
  },
});
