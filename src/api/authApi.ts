import axios from "axios"
import type { IAuthResponse } from '@/types/authTypes'


export const authService = {
  async login(username: string, password: string): Promise<IAuthResponse> {
    try {
      const response = await axios.post(
        `/FrontTestingService-auth/login`,
        null,
        {
          params: { username, password }
        }
      )
      
      // localStorage.setItem('user', JSON.stringify(response.data))

      return response.data
    } catch (error) {
      console.error('Auth error:', error)
      throw error
    }
  },

  logout() {
    localStorage.removeItem('user')
  }
}