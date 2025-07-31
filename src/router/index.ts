import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import PostPage from '@/pages/PostPage.vue'
import UserPage from '@/pages/UserPage.vue'
import { useAuthStore } from '@/stores/authStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:userId',
    name: 'UserPage',
    component: UserPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts/:postId',
    name: 'PostPage',
    component: PostPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.initialized) {
    try {
      await authStore.initTestUser()
    } catch (e) {
      authStore.logout()
    }
  }

  const isAuthRequired = to.matched.some(record => record.meta.requiresAuth)

  if (isAuthRequired && !authStore.isAuthenticated) {
    next({
      name: 'Login',
    })
  } else {
    next()
  }
})

export default router 