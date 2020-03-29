
import MainLayout from '@/core/layout/MainLayout'

const newsRouter = {
  path: '/news',
  component: MainLayout,
  children: [
    {
      path: 'list',
      component: () => import('@/pages/news/List.vue'),
    },
  ]
}
export default newsRouter
