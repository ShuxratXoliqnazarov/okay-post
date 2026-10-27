import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { removeToken, setToken } from '@/shared/api'

// persist чтобы после перезагрузки не выкидывало из аккаунта
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => {
        setToken(token)
        set({ user, token })
      },

      setUser: (user) => set({ user }),

      logout: () => {
        removeToken()
        set({ user: null, token: null })
      },
    }),
    { name: 'okeypost-user', version: 2 },
  ),
)

export const selectUser = (state) => state.user
export const selectIsAuth = (state) => Boolean(state.token)
export const selectIsAdmin = (state) => state.user?.role === 'admin'
