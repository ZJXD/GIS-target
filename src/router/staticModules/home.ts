import {type RouteRecordRaw} from 'vue-router'

const moduleName = 'home'

const routes:Array<RouteRecordRaw> = [
  {
    path:'/home',
    name:moduleName,
    component:()=>import(/* webpackChunckName: "home" */ '@/components/HelloWorld.vue'),
    meta:{title:'home'},
  }
]

export default routes
