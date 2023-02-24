import { createApp } from 'vue'
import { setupRouter } from './router/index'
// import router from './router/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss'

import * as earcut from 'earcut'
(window as any).earcut = earcut

const app = createApp(App)

async function setupAPP() {
  // 挂载路由
  await setupRouter(app)
  // app.use(router)
  // await router.isReady()

  app.use(ElementPlus)
  app.mount('#app')
}

setupAPP()
