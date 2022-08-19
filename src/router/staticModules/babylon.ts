import {type RouteRecordRaw} from 'vue-router'
import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'babylon'

const routes:Array<RouteRecordRaw> = [
  {
    path:'/babylon',
    redirect:'/babylon/start',
    component:RouterView,
    meta:{title:'babylon'},
    children:[
      {
        path:'start',
        name:`${moduleName}-start`,
        component:()=>import(/* webpackChunckName: "babylon" */ '@/views/babylon/start.vue'),
        meta:{title:'babylon start'}
      },
      {
        path:'village',
        name:`${moduleName}-village`,
        component:()=>import(/* webpackChunckName: "babylon" */ '@/views/babylon/village.vue'),
        meta:{title:'babylon village'}
      }
    ]
  }
]

export default routes
