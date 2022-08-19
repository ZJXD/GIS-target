// import 'nprogress/css/nprogress.css'
import { type App} from 'vue'
import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'
import staticModules from './staticModules'

export const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'Layout',
    redirect:'/babylon',
    component:()=>import(/* webpackChunkName:"layout" */ '@/layout/index.vue'),
    meta:{title:'首页'},
    children:[...staticModules]
  }
  // 其他路由
]

export const router = createRouter({
  history:createWebHashHistory(''),
  routes
})

export async function setupRouter(app: App) {
  app.use(router)

  // 等待路由准备就绪
  await router.isReady()
}

export default router
