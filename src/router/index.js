import Vue from 'vue'
import Router from 'vue-router'

import newsRouter from './modules/news'

Vue.use(Router)

export const routes = [
  {
    path: '/login',
    component: () => import('@/pages/Login'),
  },
  {
    path: '/',
    component: () => import('@/pages/Login'),
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
