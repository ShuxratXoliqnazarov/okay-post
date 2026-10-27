import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'

// Для login/register: авторизованного пользователя отправляет в профиль.
export function PublicOnlyRoute() {
  const isAuth = useUserStore(selectIsAuth)
  return isAuth ? <Navigate to={ROUTES.PROFILE} replace /> : <Outlet />
}
