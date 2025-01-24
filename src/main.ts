import "./app/styles/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./app/App.vue";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./app/router";
import { plugin as kyPlugin, type PluginOptions as KyPluginOptions } from "./app/plugins/ky";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use<KyPluginOptions>(kyPlugin, {
  prefixUrl: import.meta.env.VITE_API_URL,
});
app.mount("#app");
