import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'

// Пускает только авторизованных. Остальных — на страницу входа.
export function ProtectedRoute() {
  const isAuth = useUserStore(selectIsAuth)
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}
