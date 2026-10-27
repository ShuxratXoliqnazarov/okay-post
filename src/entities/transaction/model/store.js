import { create } from 'zustand'
import { transactionApi } from '../api/transactionApi'

export const useTransactionStore = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async () => {
    set({ isLoading: true, error: null })
    try {
      const transactions = await transactionApi.getAll()
      set({ transactions })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  addTransaction: async (data) => {
    const transaction = await transactionApi.create(data)
    set((state) => ({ transactions: [transaction, ...state.transactions] }))
    return transaction
  },

  updateTransaction: async (id, data) => {
    const updated = await transactionApi.update(id, data)
    set((state) => ({ transactions: state.transactions.map((item) => (item.id === id ? updated : item)) }))
    return updated
  },

  removeTransaction: async (id) => {
    await transactionApi.remove(id)
    set((state) => ({ transactions: state.transactions.filter((item) => item.id !== id) }))
  },
}))
