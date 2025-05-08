import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {i18n} from "@/i18n/config.ts";
import 'element-plus/theme-chalk/dark/css-vars.css'
// import './styles/dark/css-vars.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(i18n);
app.use(ElementPlus)
app.use(router)

app.mount('#app')