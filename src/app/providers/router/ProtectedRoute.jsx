import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'

// Пускает только авторизованных. Остальных — на вход, запомнив, куда они шли (state.from).
export function ProtectedRoute() {
  const isAuth = useUserStore(selectIsAuth)
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
}
