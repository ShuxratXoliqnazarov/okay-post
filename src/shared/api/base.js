import { API_URL } from '@/shared/config'
import { getToken } from './session'

// Базовый клиент для запросов к бэкенду.
// Используется только в слоях entities/*/api и features/*/api.
export async function request(endpoint, { method = 'GET', body, headers } = {}) {
  const token = getToken()

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message ?? 'Что-то пошло не так')
  }

  return data
}
