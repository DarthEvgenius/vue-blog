import { defineStore } from 'pinia'
import { authService } from '@/api/authApi'
import type { IAuthResponse } from '@/types/authTypes'
import router from '@/router'

interface AuthState {
  initialized: boolean,
  isAuthenticated: boolean,
  user: null | IAuthResponse,
}

const username = import.meta.env.VITE_API_USERNAME
const password = import.meta.env.VITE_API_PASSWORD

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    initialized: false,
    isAuthenticated: false,
    user: null
  }),

  actions: {
    setUser(user: IAuthResponse) {
      this.user = user
      this.isAuthenticated = true

      localStorage.setItem('user', JSON.stringify(user))
    },

    async initTestUser() {
      try {
        const response = await authService.login(username, password)

        this.setUser(response)
      } catch {
        this.user = null
        this.isAuthenticated = false
      } finally {
        this.initialized = true
      }
    },

    logout() {
      authService.logout()
      this.isAuthenticated = false
      this.user = null
      this.initialized = false

      router.push({ name: 'Login' })
    }
  }
})
