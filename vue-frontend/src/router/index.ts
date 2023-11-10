import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Index.vue')
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Index.vue')
        },
        {
          path: '404',
          name: 'notFound',
          component: () => import('@/views/404/Index.vue')
        }
      ]
    }
  ]
})

export default router
