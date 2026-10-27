import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'

// залогиненного не пускаем на логин/регистрацию
export function PublicOnlyRoute() {
  const isAuth = useUserStore(selectIsAuth)
  return isAuth ? <Navigate to={ROUTES.CABINET_PROFILE} replace /> : <Outlet />
}
