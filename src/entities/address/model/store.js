import { create } from 'zustand'
import { addressApi } from '../api/addressApi'

/*
  Состояние на экране: список, загрузка, ошибка.
  Сами данные хранятся в фейковой базе (localStorage) — стор только показывает их.

  Использование на странице:
    const { addresses, isLoading, fetchAddresses } = useAddressStore()
    useEffect(() => { fetchAddresses() }, [fetchAddresses])
*/
export const useAddressStore = create((set) => ({
  addresses: [],
  isLoading: false,
  error: null,

  fetchAddresses: async () => {
    set({ isLoading: true, error: null })
    try {
      const addresses = await addressApi.getAll()
      set({ addresses })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  addAddress: async (data) => {
    const address = await addressApi.create(data)
    set((state) => ({ addresses: [address, ...state.addresses] }))
    return address
  },

  updateAddress: async (id, data) => {
    const updated = await addressApi.update(id, data)
    set((state) => ({ addresses: state.addresses.map((item) => (item.id === id ? updated : item)) }))
    return updated
  },

  removeAddress: async (id) => {
    await addressApi.remove(id)
    set((state) => ({ addresses: state.addresses.filter((item) => item.id !== id) }))
  },
}))
