import { createApp } from 'vue'

import message from '@/utils/message'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import './assets/main.less'
// import './mocks'

window.$message = message

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
