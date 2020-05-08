
import MainLayout from '@/core/layout/MainLayout'

const newsRouter = {
  path: '/category',
  component: MainLayout,
  children: [
    {
      path: 'index',
      component: () => import('@/pages/category/Index'),
    },
  ]
}
export default newsRouter
