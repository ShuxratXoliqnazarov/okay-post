import { createCollection, delay, getCurrentUserId } from '@/shared/api'
import { NOTIFICATIONS_SEED } from '../model/mock'

const notifications = createCollection('notifications', NOTIFICATIONS_SEED)

// Фейковое API: уведомления текущего пользователя (новые — сверху)
export const notificationApi = {
  getAll: async () => {
    await delay()
    const userId = getCurrentUserId()
    return notifications
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  getById: async (id) => {
    await delay()
    return notifications.getById(id)
  },

  create: async (data) => {
    await delay()
    return notifications.create({
      ...{ isRead: false },
      ...data,
      userId: getCurrentUserId(),
      createdAt: new Date().toISOString(),
    })
  },

  update: async (id, data) => {
    await delay()
    return notifications.update(id, data)
  },

  remove: async (id) => {
    await delay()
    notifications.remove(id)
  },
}
