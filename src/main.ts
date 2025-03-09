import { createApp } from 'vue'

import message from '@/utils/message'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import apis from '@/apis'
import { getImageSrc } from '@/utils/cdn'
import _ from 'lodash-es'
import directives from './directives'
import i18n from './i18n'

import 'virtual:svg-icons-register'
import './assets/styles/index.less'

window.$message = message
window.$apis = apis
window.$getImageSrc = getImageSrc
window.$_ = _

const app = createApp(App)
app.use(directives)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
