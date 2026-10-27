import { Link, NavLink } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { LogoutButton } from '@/features/logout'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container } from '@/shared/ui'

const navLinks = [
  { to: ROUTES.HOME, label: 'Главная' },
  { to: ROUTES.TRACKING, label: 'Отследить' },
]

export function Header() {
  const isAuth = useUserStore(selectIsAuth)

  return (
    <header className="border-b border-gray-200 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link to={ROUTES.HOME} className="text-xl font-bold text-primary">
          Okey Post
        </Link>

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
            <Link to={ROUTES.PROFILE} className="hover:text-primary">
              Профиль
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
