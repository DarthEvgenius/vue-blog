import axios from "axios"

const http = axios.create({
  baseURL: '/FrontTestingService-back',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export default http
