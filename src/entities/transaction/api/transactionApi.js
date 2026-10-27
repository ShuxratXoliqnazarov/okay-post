import { createCollection, delay, getCurrentUserId } from '@/shared/api'
import { TRANSACTIONS_SEED } from '../model/mock'

const transactions = createCollection('transactions', TRANSACTIONS_SEED)

export const transactionApi = {
  getAll: async () => {
    await delay()
    const userId = getCurrentUserId()
    return transactions
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  getById: async (id) => {
    await delay()
    return transactions.getById(id)
  },

  create: async (data) => {
    await delay()
    return transactions.create({
      ...data,
      userId: getCurrentUserId(),
      createdAt: new Date().toISOString(),
    })
  },

  update: async (id, data) => {
    await delay()
    return transactions.update(id, data)
  },

  remove: async (id) => {
    await delay()
    transactions.remove(id)
  },
}
