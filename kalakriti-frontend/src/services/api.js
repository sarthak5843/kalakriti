import axios from 'axios'

let baseUrl = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_URL || '/api');
if (baseUrl && !baseUrl.endsWith('/api') && !baseUrl.endsWith('/api/') && baseUrl.startsWith('http')) {
  // Ensure we don't have trailing slash issues
  baseUrl = baseUrl.endsWith('/') ? baseUrl + 'api' : baseUrl + '/api';
}

const api = axios.create({
  baseURL: baseUrl,
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
