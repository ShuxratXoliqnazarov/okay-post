// Публичный API слайса. Импортируй только отсюда: import { useUserStore } from '@/entities/user'
export { useUserStore, selectUser, selectIsAuth, selectIsAdmin } from './model/store'
export { WAREHOUSE_ADDRESS, getVirtualAddressRows, getFullName } from './model/constants'
export { userApi } from './api/userApi'
