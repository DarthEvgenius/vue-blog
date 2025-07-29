import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: '/FrontTestingService-back',
  headers: {
    'Content-Type': 'application/json'
  }
})

//  интерсептор для авторизации
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api