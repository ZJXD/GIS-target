import {type RouteRecordRaw} from 'vue-router'
import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'L7'

const routes:Array<RouteRecordRaw> = [
  {
    path:'/l7',
    redirect:'/l7/demo',
    component:RouterView,
    meta:{title:'L7'},
    children:[
      {
        path:'demo',
        name:`${moduleName}-demo`,
        component:()=>import(/* webpackChunckName: "L7" */ '@/views/L7/demo.vue'),
        meta:{title:'L7 Demo'}
      },
      {
        path:'building',
        name:`${moduleName}-building`,
        component:()=>import(/* webpackChunckName: "L7" */ '@/views/L7/building.vue'),
        meta:{title:'L7 building'}
      }
    ]
  }
]

export default routes
