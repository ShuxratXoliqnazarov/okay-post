import { create } from 'zustand'
import { orderApi } from '../api/orderApi'

export const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null })
    try {
      const orders = await orderApi.getAll()
      set({ orders })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  addOrder: async (data) => {
    const order = await orderApi.create(data)
    set((state) => ({ orders: [order, ...state.orders] }))
    return order
  },

  updateOrder: async (id, data) => {
    const updated = await orderApi.update(id, data)
    set((state) => ({ orders: state.orders.map((item) => (item.id === id ? updated : item)) }))
    return updated
  },

  removeOrder: async (id) => {
    await orderApi.remove(id)
    set((state) => ({ orders: state.orders.filter((item) => item.id !== id) }))
  },
}))
