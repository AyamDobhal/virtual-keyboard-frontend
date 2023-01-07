export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "keylogger",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css",
      },
    ],
    script: [
      {
        src: "https://unpkg.com/phosphor-icons",
      },
    ],
  },

  buildModules: ["@nuxtjs/moment"],
  modules: [
    "@nuxtjs/axios",
  ],

  plugins: ["~/plugins/provider.js"],

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
};
