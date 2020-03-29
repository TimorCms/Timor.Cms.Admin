import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from '@/core/layout/MainLayout'

import newsRouter from './modules/news'

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

Vue.use(Router)

export const routes = [
  {
    path: '/',
    component: () => import('@/pages/user/Login'),
  },
  {
    path: '/login',
    component: () => import('@/pages/user/Login'),
  },
  {
    path: '/dashboard',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/dashboard/Index'),
      },
    ]
  },
  newsRouter
]

const createRouter = () => new Router({
  routes: routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
