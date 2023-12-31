import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './modules/axios'
import util from './modules/utils/util'
import constant from './modules/utils/constant'
import vue3DayjsPlugin from 'vue3-dayjs-plugin'
import LoadScript from "vue-plugin-load-script"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axios)
app.use(util)
app.use(constant)
app.use(vue3DayjsPlugin)
app.use(LoadScript)


app.mount('#app')