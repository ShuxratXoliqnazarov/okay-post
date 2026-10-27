import { create } from 'zustand'
import { parcelApi } from '../api/parcelApi'

export const useParcelStore = create((set) => ({
  parcels: [],
  isLoading: false,
  error: null,

  fetchParcels: async () => {
    set({ isLoading: true, error: null })
    try {
      const parcels = await parcelApi.getAll()
      set({ parcels })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  addParcel: async (data) => {
    const parcel = await parcelApi.create(data)
    set((state) => ({ parcels: [parcel, ...state.parcels] }))
    return parcel
  },

  updateParcel: async (id, data) => {
    const updated = await parcelApi.update(id, data)
    set((state) => ({ parcels: state.parcels.map((item) => (item.id === id ? updated : item)) }))
    return updated
  },

  removeParcel: async (id) => {
    await parcelApi.remove(id)
    set((state) => ({ parcels: state.parcels.filter((item) => item.id !== id) }))
  },
}))
