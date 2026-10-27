import { request } from '@/shared/api'

export const userApi = {
  login: (data) => request('/auth/login', { method: 'POST', body: data }),
  register: (data) => request('/auth/register', { method: 'POST', body: data }),
  getMe: () => request('/auth/me'),
}
