import { NavLink, Outlet } from 'react-router-dom'
import { LogoutButton } from '@/features/logout'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'

const adminLinks = [
  { to: ROUTES.ADMIN_ORDERS, label: 'Заказы' },
  { to: ROUTES.ADMIN_PARCELS, label: 'Посылки' },
  { to: ROUTES.ADMIN_BARCODE, label: 'Сформировать баркод' },
  { to: ROUTES.ADMIN_USERS, label: 'Пользователи' },
  { to: ROUTES.ADMIN_TRANSACTIONS, label: 'Транзакции' },
  { to: ROUTES.ADMIN_PAGE_EDITOR, label: 'Редактор страниц' },
  { to: ROUTES.ADMIN_COMPANY_EXPENSES, label: 'Расходы фирмы' },
  { to: ROUTES.ADMIN_SALARY_EXPENSES, label: 'Расходы по ЗП' },
  { to: ROUTES.ADMIN_SETTINGS, label: 'Настройки' },
]

// Обёртка админ-панели: боковое меню слева + контент справа
export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col gap-1 bg-dark p-4 text-white">
        <p className="mb-4 text-xl font-bold">Okey Post Admin</p>
        {adminLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn('rounded-lg px-3 py-2 hover:bg-white/10', isActive && 'bg-primary')
            }
          >
            {label}
          </NavLink>
        ))}
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
