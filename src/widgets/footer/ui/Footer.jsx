import { Link } from 'react-router-dom'
import { WhatsappLogo, TelegramLogo, ChatCircleDots } from '@phosphor-icons/react'
import { ROUTES } from '@/shared/config'
import { Container, Logo } from '@/shared/ui'
import { ChatTextIcon, PhoneCallIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { Container, Logo } from '@/shared/ui'

const CURRENT_YEAR = new Date().getFullYear()

// Ссылки без готовых страниц пока ведут на заглушки — пути подставим, когда страницы появятся
const columns = [
  {
    title: 'О компании',
    links: [
      { label: 'Услуги', to: ROUTES.PRICES },
      { label: 'Цены', to: ROUTES.PRICES },
      { label: 'Отзывы', to: ROUTES.HOME },
      { label: 'Контакты', to: ROUTES.FAQ },
      { label: 'Вакансии', to: ROUTES.HOME },
      { label: 'Соглашение о персональных данных', to: ROUTES.HOME },
      { label: 'Условия использования', to: ROUTES.HOME },
    ],
  },
  {
    title: 'Полезное',
    links: [
      { label: 'Как работает наш сервис', to: ROUTES.HOW_TO_BUY },
      { label: 'Как покупать с оператором', to: ROUTES.HOW_TO_BUY },
      { label: 'Ответы на частые вопросы', to: ROUTES.FAQ },
      { label: 'Популярные магазины', to: ROUTES.SHOPS },
      { label: 'Черный список магазинов', to: ROUTES.SHOPS },
      { label: 'Актуальные распродажи', to: ROUTES.SALES },
    ],
  },
  {
    title: 'Спецпроекты',
    links: [
      { label: '50% на первую доставку', to: ROUTES.PARTNERS },
      { label: 'Скидки для постоянных клиентов', to: ROUTES.PARTNERS },
      { label: 'Реферальная программа', to: ROUTES.PARTNERS },
      { label: 'Кэшбек Mr. Rebates и Rakuten', to: ROUTES.PARTNERS },
      { label: 'Stop Fraud', to: ROUTES.BLOG },
    ],
  },
]

const socials = [
  { label: 'WhatsApp', Icon: WhatsappLogoIcon, color: 'text-primary border-primary' },
  { label: 'Viber', Icon: PhoneCallIcon, color: 'text-indigo border-indigo' },
  { label: 'Чат', Icon: ChatTextIcon, color: 'text-accent border-accent' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line/60 bg-white pt-12 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Колонка с логотипом и соцсетями */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Logo />
            <div className="flex items-center gap-3">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-[#25D366] transition-all hover:border-[#25D366] hover:bg-white hover:scale-110 shadow-sm"
              >
                <WhatsappLogo size={20} weight="fill" />
              </a>
              <a
                href="https://viber.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Viber"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-[#7360F2] transition-all hover:border-[#7360F2] hover:bg-white hover:scale-110 shadow-sm"
              >
                <ChatCircleDots size={20} weight="fill" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-[#0088cc] transition-all hover:border-[#0088cc] hover:bg-white hover:scale-110 shadow-sm"
              >
                <TelegramLogo size={20} weight="fill" />
              </a>
            </div>
          </div>

          {/* О компании */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-dark">О компании</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-muted">
              <li>
                <Link to={ROUTES.PRICES} className="transition-colors hover:text-primary">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRICES} className="transition-colors hover:text-primary">
                  Цены
                </Link>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">Отзывы</span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">Контакты</span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">Вакансии</span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">
                  Соглашение о персональных данных
                </span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">
                  Условия использования
                </span>
              </li>
            </ul>
          </div>

          {/* Полезное */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-dark">Полезное</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-muted">
              <li>
                <Link to={ROUTES.HOW_TO_BUY} className="transition-colors hover:text-primary">
                  Как работает наш сервис
                </Link>
              </li>
              <li>
                <Link to={ROUTES.HOW_TO_BUY} className="transition-colors hover:text-primary">
                  Как покупать с оператором
                </Link>
              </li>
              <li>
                <Link to={ROUTES.FAQ} className="transition-colors hover:text-primary">
                  Ответы на частые вопросы
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SHOPS} className="transition-colors hover:text-primary">
                  Популярные магазины
                </Link>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">
                  Черный список магазинов
                </span>
              </li>
              <li>
                <Link to={ROUTES.SALES} className="transition-colors hover:text-primary">
                  Актуальные распродажи
                </Link>
              </li>
            </ul>
          </div>

          {/* Спецпроекты */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-dark">Спецпроекты</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-muted">
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">
                  50% на первую доставку
                </span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">
                  Скидки для постоянных клиентов
                </span>
              </li>
              <li>
                <Link to={ROUTES.PARTNERS} className="transition-colors hover:text-primary">
                  Реферальная программа
                </Link>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">
                  Кэшбек Mr. Rebates и Rakuten
                </span>
              </li>
              <li>
                <span className="cursor-pointer transition-colors hover:text-primary">
                  Stop Fraud
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 border-t border-line/60 pt-6 text-center text-xs text-muted/70">
          © 2021 Okeypost . Все права защищены.
    <footer id="contacts" className="mt-auto scroll-mt-6 bg-white pt-14 text-dark lg:pt-20">
      <Container className="max-w-[1448px]">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Logo />
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ label, Icon, color }) => (
                <a
                  key={label}
                  href="#contacts"
                  aria-label={label}
                  className={`flex size-[46px] items-center justify-center rounded-full border transition hover:bg-surface ${color}`}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h3 className="text-[15px] font-bold">{title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-[13px] font-light hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-[60px]">
        <p className="border-t border-line py-9 text-center text-xs font-light">
          © {CURRENT_YEAR} Okeypost . Все права защищены.
        </p>
      </div>
    </footer>
  )
}
