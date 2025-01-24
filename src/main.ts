import "./app/styles/main.scss";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./app/App.vue";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./app/router";
import { plugin as kyPlugin, type PluginOptions as KyPluginOptions } from "./app/plugins/ky";

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use<KyPluginOptions>(kyPlugin, {
  prefixUrl: import.meta.env.VITE_API_URL,
});
app.mount("#app");
