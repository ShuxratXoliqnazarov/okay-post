import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'

// не залогинен -> на логин, from чтобы потом вернуть обратно
export function ProtectedRoute() {
  const isAuth = useUserStore(selectIsAuth)
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
}
