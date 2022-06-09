import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
// const app = createApp(App);

// const googleClientId =
//   "499576819811-krnnrnb8ldsundhuou91998hguiqr4l6.apps.googleusercontent.com";

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
