import { Outlet } from 'react-router-dom'

// Обёртка для страниц входа/регистрации: карточка по центру, без шапки
export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <Outlet />
      </div>
    </div>
  )
}
