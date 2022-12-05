import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import './assets/main.less'

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
