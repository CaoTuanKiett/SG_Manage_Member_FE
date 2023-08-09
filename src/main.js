import { createApp } from 'vue'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'

import './assets/main.css'
import router from './router/router'

createApp(App)
  .use(Notifications)
  .use(router)
  .mount('#app')
