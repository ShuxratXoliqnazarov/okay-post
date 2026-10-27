import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAdmin, useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'

// только для админа
export function AdminRoute() {
  const isAdmin = useUserStore(selectIsAdmin)
  return isAdmin ? <Outlet /> : <Navigate to={ROUTES.ADMIN_LOGIN} replace />
}
