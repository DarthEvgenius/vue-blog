import axios from "axios"

interface AuthResponse {
  token: string
}

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/login`,
        null, // empty body
        {
          params: { username, password }
        }
      )

      localStorage.setItem('authToken', response.data.token)
      return response.data
    } catch (error) {
      console.error('Auth error:', error)
      throw error
    }
  },

  logout() {
    localStorage.removeItem('authToken')
  },

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }
}