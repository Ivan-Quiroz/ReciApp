import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import gAuthPlugin from 'vue3-google-oauth2'
//import { apply } from 'core-js/fn/reflect'
let gauthClientId = '499576819811-krnnrnb8ldsundhuou91998hguiqr4l6.apps.googleusercontent.com'
const app = createApp(App)

app.use(gAuthPlugin,{
   clientId: gauthClientId,
   prompt: 'consent',
  })


loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
