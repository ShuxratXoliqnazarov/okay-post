import { useState } from 'react'
import { ListIcon, UserIcon, XIcon } from '@phosphor-icons/react'
import { Link, NavLink } from 'react-router-dom'
import { selectIsAuth, useUserStore } from '@/entities/user'
import { LogoutButton } from '@/features/logout'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button, Container, Logo } from '@/shared/ui'

const navLinks = [
  { to: ROUTES.HOW_TO_BUY, label: 'Как покупать' },
  { to: ROUTES.SALES, label: 'Распродажи' },
  { to: ROUTES.PRICES, label: 'Цены' },
  { to: ROUTES.FAQ, label: 'Помощь' },
  { to: ROUTES.PARTNERS, label: 'Бонусы' },
  { to: ROUTES.BLOG, label: 'Блог' },
  { to: ROUTES.SHOPS, label: 'Магазины' },
]

// «Связаться с нами» плавно прокручивает к футеру с мессенджерами
const scrollToContacts = () => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })

const navLinkClass = ({ isActive }) =>
  cn('text-sm font-bold whitespace-nowrap transition-colors hover:text-primary', isActive && 'text-primary')

// Шапка публичного сайта: логотип, меню, вход и кнопка «Связаться с нами». На узких экранах меню — в бургере
export function Header() {
  const isAuth = useUserStore(selectIsAuth)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  const accountLink = isAuth ? (
    <Link to={ROUTES.CABINET_PROFILE} onClick={closeMenu} className="flex items-center gap-2.5 text-sm font-bold hover:text-primary">
      <UserIcon size={24} />
      Кабинет
    </Link>
  ) : (
    <Link to={ROUTES.LOGIN} onClick={closeMenu} className="flex items-center gap-2.5 text-sm font-bold hover:text-primary">
      <UserIcon size={24} />
      Вход
    </Link>
  )

  return (
    <header className="relative z-30 bg-white">
      <Container className="flex h-[84px] max-w-[1448px] items-center justify-between gap-6 lg:h-[120px]">
        <Logo />

        <nav className="hidden items-center gap-6 xl:gap-10 lg:flex" aria-label="Основное меню">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex xl:gap-9">
          {accountLink}
          {isAuth && <LogoutButton />}
          <Button onClick={scrollToContacts} className="h-12 px-8 text-[13px]">
            Связаться с нами
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className="flex size-11 items-center justify-center rounded-full text-dark hover:bg-surface lg:hidden"
        >
          {menuOpen ? <XIcon size={26} /> : <ListIcon size={26} />}
        </button>
      </Container>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-line bg-white shadow-card lg:hidden">
          <Container className="flex flex-col gap-5 py-6">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={closeMenu} className={cn(navLinkClass, 'text-base')}>
                {label}
              </NavLink>
            ))}
            <div className="flex flex-wrap items-center gap-6 border-t border-line pt-5">
              {accountLink}
              {isAuth && <LogoutButton />}
            </div>
            <Button onClick={() => {
                closeMenu()
                scrollToContacts()
              }} className="h-12 w-full text-[13px]">
              Связаться с нами
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
