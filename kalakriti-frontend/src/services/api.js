import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status
    const url = err.config?.url || ''
    // Only auto-logout on 401, and never on auth endpoints themselves
    if (status === 401 && !url.includes('/auth/')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      const isAdminPath = window.location.pathname.startsWith('/admin')
      window.location.href = isAdminPath ? '/admin/login' : '/login'
    }
    return Promise.reject(err)
  }
)

export default api
