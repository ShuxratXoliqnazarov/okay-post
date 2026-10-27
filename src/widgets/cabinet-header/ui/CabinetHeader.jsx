import { useState } from 'react'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'
import { selectUnreadCount, useNotificationStore } from '@/entities/notification'
import { getFullName, selectUser, useUserStore } from '@/entities/user'
import { LogoutButton } from '@/features/logout'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Avatar, Badge, Container, Logo } from '@/shared/ui'

// Пункты меню ЛК. Посылки и Транзакции — разделы страницы заказов (якоря #parcels, #transactions).
const NAV_ITEMS = [
  { to: ROUTES.HOME, label: 'Главная', isActive: () => false },
  { to: ROUTES.CABINET_PROFILE, label: 'Профиль', isActive: ({ pathname }) => pathname.startsWith(ROUTES.CABINET_PROFILE) },
  {
    to: ROUTES.CABINET_ORDERS,
    label: 'Заказы',
    isActive: ({ pathname, hash }) => pathname.startsWith(ROUTES.CABINET_ORDERS) && !hash,
  },
  {
    to: ROUTES.CABINET_PARCELS,
    label: 'Посылки',
    isActive: ({ pathname, hash }) => hash === '#parcels' || pathname === ROUTES.CABINET_CREATE_PARCEL,
  },
  { to: ROUTES.CABINET_TRANSACTIONS, label: 'Транзакции', isActive: ({ hash }) => hash === '#transactions' },
  { to: ROUTES.CABINET_ADDRESS_BOOK, label: 'Адресная книга', isActive: ({ pathname }) => pathname === ROUTES.CABINET_ADDRESS_BOOK },
  {
    to: ROUTES.CABINET_NOTIFICATIONS,
    label: 'Уведомления',
    withBadge: true,
    isActive: ({ pathname }) => pathname === ROUTES.CABINET_NOTIFICATIONS,
  },
]

// Шапка личного кабинета: логотип, меню с бейджем уведомлений, аватар с именем (бургер на планшете/мобильном)
export function CabinetHeader() {
  const location = useLocation()
  const user = useUserStore(selectUser)
  const unreadCount = useNotificationStore(selectUnreadCount)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const navLinks = NAV_ITEMS.map(({ to, label, withBadge, isActive }) => (
    <Link
      key={label}
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={cn(
        'relative inline-flex text-sm font-medium whitespace-nowrap transition-colors hover:text-primary',
        isActive(location) && 'text-primary',
      )}
    >
      {label}
      {withBadge && <Badge count={unreadCount} className="absolute -top-3 -right-5" />}
    </Link>
  ))

  return (
    <header className="sticky top-0 z-40 bg-white">
      <Container className="flex h-20 items-center justify-between gap-6 lg:h-[120px]">
        <Logo />

        <nav className="hidden items-center gap-9 xl:flex">{navLinks}</nav>

        <div className="relative flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-3"
            aria-expanded={isUserMenuOpen}
          >
            <Avatar src={user?.avatar} className="size-11 rounded-full sm:size-[58px]" />
            <span className="hidden border-b border-dashed border-dark text-sm font-medium sm:inline">
              {getFullName(user)}
            </span>
          </button>

          {isUserMenuOpen && (
            <div
              className="absolute top-full right-0 z-50 mt-3 flex w-48 flex-col rounded-xl bg-white p-2 shadow-card"
              onClick={() => setIsUserMenuOpen(false)}
            >
              <Link to={ROUTES.CABINET_PROFILE} className="rounded-lg px-3 py-2 text-sm hover:bg-surface">
                Профиль
              </Link>
              <Link to={ROUTES.CABINET_PROFILE_EDIT} className="rounded-lg px-3 py-2 text-sm hover:bg-surface">
                Редактировать
              </Link>
              <LogoutButton className="h-auto justify-start rounded-lg px-3 py-2 text-sm font-normal text-danger" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative text-dark xl:hidden"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMenuOpen ? <XIcon size={28} /> : <ListIcon size={28} />}
            {!isMenuOpen && <Badge count={unreadCount} className="absolute -top-2 -right-2" />}
          </button>
        </div>
      </Container>

      {isMenuOpen && (
        <nav className="flex flex-col gap-5 border-t border-line bg-white px-6 py-6 shadow-card xl:hidden">
          {navLinks}
        </nav>
      )}
    </header>
  )
}
