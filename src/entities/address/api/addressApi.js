import { createCollection, delay, getCurrentUserId } from '@/shared/api'
import { ADDRESSES_SEED } from '../model/mock'

const addresses = createCollection('addresses', ADDRESSES_SEED)

// Фейковое API: адреса текущего пользователя (новые — сверху)
export const addressApi = {
  getAll: async () => {
    await delay()
    const userId = getCurrentUserId()
    return addresses
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  getById: async (id) => {
    await delay()
    return addresses.getById(id)
  },

  create: async (data) => {
    await delay()
    return addresses.create({
      ...data,
      userId: getCurrentUserId(),
      createdAt: new Date().toISOString(),
    })
  },

  update: async (id, data) => {
    await delay()
    return addresses.update(id, data)
  },

  remove: async (id) => {
    await delay()
    addresses.remove(id)
  },
}
