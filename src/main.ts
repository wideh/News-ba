import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import router from './router/index'
import { store } from "./store/index"

createApp(App).use(ElementPlus, { locale }).use(router).use(store).mount('#app')
