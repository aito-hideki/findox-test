import { createApp } from 'vue'
import { quasar } from './plugins'
import App from './App.vue'

createApp(App)
  .use(quasar)
  .mount('#app')
