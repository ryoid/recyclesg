import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-BLL5BRS9T4",
      params: {
        send_page_view: true,
      },
    },
  });
});
