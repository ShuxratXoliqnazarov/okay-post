import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Глобальное состояние пользователя. persist сохраняет его в localStorage.
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => {
        localStorage.setItem('token', token)
        set({ user, token })
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null })
      },
    }),
    { name: 'user-storage' },
  ),
)

// Селекторы — чтобы компонент перерисовывался только когда меняется нужное поле
export const selectUser = (state) => state.user
export const selectIsAuth = (state) => Boolean(state.token)
