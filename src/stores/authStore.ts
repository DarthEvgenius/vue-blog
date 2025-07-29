import { defineStore } from 'pinia'
import { authService } from '@/api/auth'

interface AuthState {
  isAuthenticated: boolean,
  username: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    username: null
  }),

  actions: {
    async login(username: string, password: string) {
      try {
        await authService.login(username, password)
        this.isAuthenticated = true
        this.username = username
        return true
      } catch (error) {
        this.logout()
        return false
      }
    },

    logout() {
      authService.logout()
      this.isAuthenticated = false
      this.username = null
    },

    initialize() {
      this.isAuthenticated = !!authService.getToken()
    }
  }
})
