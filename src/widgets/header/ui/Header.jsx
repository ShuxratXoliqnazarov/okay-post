import { Link, NavLink } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { LogoutButton } from '@/features/logout'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, Logo } from '@/shared/ui'

const navLinks = [
  { to: ROUTES.HOW_TO_BUY, label: 'Как покупать' },
  { to: ROUTES.SALES, label: 'Распродажи' },
  { to: ROUTES.PRICES, label: 'Цены' },
  { to: ROUTES.SHOPS, label: 'Магазины' },
  { to: ROUTES.BLOG, label: 'Блог' },
  { to: ROUTES.FAQ, label: 'FAQ' },
]

export function Header() {
  const isAuth = useUserStore(selectIsAuth)

  return (
    <header className="border-b border-gray-200 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn('hover:text-primary', isActive && 'text-primary')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {isAuth ? (
          <div className="flex items-center gap-3">
            <Link to={ROUTES.CABINET_PROFILE} className="hover:text-primary">
              Личный кабинет
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <Link to={ROUTES.LOGIN} className="font-medium text-primary">
            Войти
          </Link>
        )}
      </Container>
    </header>
  )
}
