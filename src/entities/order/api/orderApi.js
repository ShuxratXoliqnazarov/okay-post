import { createCollection, delay, getCurrentUserId } from '@/shared/api'
import { ORDERS_SEED } from '../model/mock'

const orders = createCollection('orders', ORDERS_SEED)

export const orderApi = {
  getAll: async () => {
    await delay()
    const userId = getCurrentUserId()
    return orders
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  getById: async (id) => {
    await delay()
    return orders.getById(id)
  },

  create: async (data) => {
    await delay()
    return orders.create({
      ...data,
      userId: getCurrentUserId(),
      createdAt: new Date().toISOString(),
    })
  },

  update: async (id, data) => {
    await delay()
    return orders.update(id, data)
  },

  remove: async (id) => {
    await delay()
    orders.remove(id)
  },
}
