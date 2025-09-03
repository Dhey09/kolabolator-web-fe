import { createApp } from "vue";
import App from "./App.vue";

// Router & Store
import router from "./router";
import store from "./store";

// Ant Design Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import * as Icons from "@ant-design/icons-vue";

// Tailwind CSS
import "./assets/css/main.css";

// Buat instance Vue
const app = createApp(App);

// Pakai plugin global
app.use(router);
app.use(store);
app.use(Antd);
const icons = Icons;
for (const i in icons) {
  app.component(i, icons[i]);
}
// Mount ke DOM
app.mount("#app");
