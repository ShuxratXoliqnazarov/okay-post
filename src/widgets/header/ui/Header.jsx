import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { User, List, X } from '@phosphor-icons/react'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { LogoutButton } from '@/features/logout'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Container, Logo } from '@/shared/ui'

const navLinks = [
  { to: ROUTES.HOW_TO_BUY, label: 'Как покупать' },
  { to: ROUTES.SALES, label: 'Распродажи' },
  { to: ROUTES.PRICES, label: 'Цены' },
  { to: ROUTES.FAQ, label: 'Помощь' },
  { to: ROUTES.PARTNERS, label: 'Бонусы' },
  { to: ROUTES.BLOG, label: 'Блог' },
  { to: ROUTES.SHOPS, label: 'Магазины' },
]

export function Header() {
  const isAuth = useUserStore(selectIsAuth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/50 bg-white/95 backdrop-blur-md transition-all">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        {/* Десктопное меню */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-semibold transition-colors duration-200 hover:text-primary',
                  isActive ? 'text-primary' : 'text-dark/90'
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Правая часть: вход / ЛК + кнопка связи */}
        <div className="hidden items-center gap-5 md:flex">
          {isAuth ? (
            <div className="flex items-center gap-3">
              <Link
                to={ROUTES.CABINET_PROFILE}
                className="flex items-center gap-2 text-sm font-semibold text-dark hover:text-primary transition-colors"
              >
                <User size={18} weight="bold" />
                Личный кабинет
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="flex items-center gap-1.5 text-sm font-semibold text-dark transition-colors hover:text-primary"
            >
              <User size={18} weight="bold" />
              <span>Вход</span>
            </Link>
          )}

          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(0,201,123,0.35)] transition-all duration-300 hover:bg-primary-light hover:shadow-button hover:scale-105 active:scale-95"
          >
            Связаться с нами
          </a>
        </div>

        {/* Мобильная кнопка меню */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-dark lg:hidden"
          aria-label="Меню"
        >
          {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </Container>

      {/* Мобильное выпадающее меню */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-white px-6 py-6 shadow-xl lg:hidden animate-fade-scale">
          <nav className="flex flex-col gap-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'py-1 text-base font-semibold transition-colors',
                    isActive ? 'text-primary' : 'text-dark'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-line">
              {isAuth ? (
                <Link
                  to={ROUTES.CABINET_PROFILE}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold text-dark"
                >
                  <User size={20} weight="bold" />
                  Личный кабинет
                </Link>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold text-dark"
                >
                  <User size={20} weight="bold" />
                  Вход
                </Link>
              )}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-button"
              >
                Связаться с нами
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
