import { createApp } from 'vue'

import message from '@/utils/message'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import apis from '@/apis'

import './assets/styles/main.less'

import 'virtual:svg-icons-register'
// import './mocks'

window.$message = message
window.$apis = apis
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
