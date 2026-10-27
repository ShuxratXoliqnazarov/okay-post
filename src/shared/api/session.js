// токен лежит в localStorage
const TOKEN_KEY = 'okeypost-token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

// фейк токен: fake-token-<id>
export const createFakeToken = (userId) => `fake-token-${userId}`

export function getCurrentUserId() {
  const userId = Number(getToken()?.replace('fake-token-', ''))
  if (!userId) throw new Error('Необходимо войти в аккаунт')
  return userId
}
