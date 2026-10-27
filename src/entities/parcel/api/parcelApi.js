import { createCollection, delay, getCurrentUserId } from '@/shared/api'
import { PARCELS_SEED } from '../model/mock'

const parcels = createCollection('parcels', PARCELS_SEED)

// Фейковое API: посылки текущего пользователя (новые — сверху)
export const parcelApi = {
  getAll: async () => {
    await delay()
    const userId = getCurrentUserId()
    return parcels
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  getById: async (id) => {
    await delay()
    return parcels.getById(id)
  },

  create: async (data) => {
    await delay()
    return parcels.create({
      ...data,
      userId: getCurrentUserId(),
      createdAt: new Date().toISOString(),
    })
  },

  update: async (id, data) => {
    await delay()
    return parcels.update(id, data)
  },

  remove: async (id) => {
    await delay()
    parcels.remove(id)
  },
}
