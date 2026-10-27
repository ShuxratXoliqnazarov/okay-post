import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { NotFoundPage } from '@/pages/not-found'
import { ProfilePage } from '@/pages/profile'
import { RegisterPage } from '@/pages/register'
import { TrackingPage } from '@/pages/tracking'
import { AuthLayout, MainLayout } from '@/widgets/layout'
import { ROUTES } from '@/shared/config'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'

// Все маршруты приложения (декларативный подход).
// Новая страница: создай её в src/pages, добавь путь в shared/config/routes.js и <Route> сюда.
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.TRACKING} element={<TrackingPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
