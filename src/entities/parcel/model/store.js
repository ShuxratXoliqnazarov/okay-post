import { create } from 'zustand'

export const useParcelStore = create((set) => ({
  parcel: null,
  isLoading: false,
  error: null,

  setParcel: (parcel) => set({ parcel, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, parcel: null }),
  reset: () => set({ parcel: null, isLoading: false, error: null }),
}))
