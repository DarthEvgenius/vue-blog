import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HomeView from '@/components/HomeView.vue'
import ApiTest from '@/components/ApiTest.vue'
import LoginView from '@/components/LoginView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/test',
    name: 'test',
    component: HomeView
  },
  {
    path: '/test-api',
    name: 'test-api',
    component: ApiTest
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 