import { create } from 'zustand'
import { notificationApi } from '../api/notificationApi'

/*
  Состояние на экране: список, загрузка, ошибка.
  Сами данные хранятся в фейковой базе (localStorage) — стор только показывает их.

  Использование на странице:
    const { notifications, isLoading, fetchNotifications } = useNotificationStore()
    useEffect(() => { fetchNotifications() }, [fetchNotifications])
*/
export const useNotificationStore = create((set) => ({
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null })
    try {
      const notifications = await notificationApi.getAll()
      set({ notifications })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  addNotification: async (data) => {
    const notification = await notificationApi.create(data)
    set((state) => ({ notifications: [notification, ...state.notifications] }))
    return notification
  },

  updateNotification: async (id, data) => {
    const updated = await notificationApi.update(id, data)
    set((state) => ({ notifications: state.notifications.map((item) => (item.id === id ? updated : item)) }))
    return updated
  },

  removeNotification: async (id) => {
    await notificationApi.remove(id)
    set((state) => ({ notifications: state.notifications.filter((item) => item.id !== id) }))
  },
}))

// Для зелёного бейджа-счётчика в меню ЛК
export const selectUnreadCount = (state) =>
  state.notifications.filter((item) => !item.isRead).length
