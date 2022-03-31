import {type RouteRecordRaw} from 'vue-router'

const moduleName = 'error'

export const notFound:RouteRecordRaw = {
  path:'/:pathMatch(.*)*',
  name:'NotFound',
  meta:{
    title:'NotFound',
    hideInMenu:true,
    hideInTabs:true
  },
  redirect:'/error/404'
}

export const errorRoute:RouteRecordRaw = {
  path:'/error',
  name:moduleName,
  redirect:'/error/404',
  meta:{title:'错误页'},
  children:[
    {
      path:'404',
      name:'PageNotFound',
      meta:{title:'404'},
      component:()=>import(/* webpackChunkName: "404" */ '@/views/error/404.vue')
    }
  ]
}

export default [errorRoute,notFound]
