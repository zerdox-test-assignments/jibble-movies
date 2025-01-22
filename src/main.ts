import "./app/styles/main.scss";
import { createApp } from "vue";
import App from "./app/App.vue";

import { createPinia } from "pinia";
import router from "./app/router";
import { plugin as kyPlugin, type PluginOptions as KyPluginOptions } from "./app/plugins/ky";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use<KyPluginOptions>(kyPlugin, {
  prefixUrl: import.meta.env.VITE_API_URL,
});
app.mount("#app");
