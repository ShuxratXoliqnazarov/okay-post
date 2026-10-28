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
