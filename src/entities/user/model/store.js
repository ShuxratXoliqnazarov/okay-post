import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { removeToken, setToken } from '@/shared/api'

// Текущий пользователь. persist сохраняет его в localStorage, чтобы после перезагрузки остаться в аккаунте.
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => {
        setToken(token)
        set({ user, token })
      },

      // После редактирования профиля — кладём обновлённого пользователя
      setUser: (user) => set({ user }),

      logout: () => {
        removeToken()
        set({ user: null, token: null })
      },
    }),
    { name: 'okeypost-user', version: 2 },
  ),
)

// Селекторы — чтобы компонент перерисовывался только когда меняется нужное поле
export const selectUser = (state) => state.user
export const selectIsAuth = (state) => Boolean(state.token)
export const selectIsAdmin = (state) => state.user?.role === 'admin'
