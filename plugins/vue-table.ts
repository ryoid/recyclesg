import { defineNuxtPlugin } from "#app";
import { FlexRender } from "@tanstack/vue-table";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FlexRender", FlexRender);
});
