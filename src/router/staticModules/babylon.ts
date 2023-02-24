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
      },
      {
        path:'car',
        name:`${moduleName}-car`,
        component:()=>import(/* webpackChunckName: "babylon" */ '@/views/babylon/car.vue'),
        meta:{title:'babylon car'}
      },
      {
        path:'animVillage',
        name:`${moduleName}-animVillage`,
        component:()=>import(/* webpackChunckName: "babylon" */ '@/views/babylon/animVillage.vue'),
        meta:{title:'babylon animVillage'}
      },
      {
        path:'environment',
        name:`${moduleName}-environment`,
        component:()=>import(/* webpackChunckName: "babylon" */ '@/views/babylon/environment.vue'),
        meta:{title:'babylon environment'}
      }
    ]
  }
]

export default routes
