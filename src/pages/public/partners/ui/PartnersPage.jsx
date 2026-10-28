import { Link } from 'react-router-dom'
import {
  Tag,
  Coins,
  MegaphoneSimple,
  DeviceMobile,
  CurrencyCircleDollar,
  ArrowRight,
} from '@phosphor-icons/react'
import { ROUTES } from '@/shared/config'
import { Container, PageHero } from '@/shared/ui'
import rocketImg from '@/shared/assets/images/partners-rocket.jpg'

const BENEFITS = [
  {
    icon: (
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8FBF4] text-[#00c97b] shadow-inner transition-transform group-hover:scale-110 duration-300">
        <Tag size={30} weight="fill" />
      </div>
    ),
    title: 'Дарим скидку 10% вашим друзьям и подписчикам',
    description:
      'На их первую отправленную посылку. Вам есть чем мотивировать зарегистрироваться именно по вашему реферальному коду или ссылке.',
  },
  {
    icon: (
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#41b7e9] shadow-inner transition-transform group-hover:scale-110 duration-300">
        <Coins size={30} weight="fill" />
      </div>
    ),
    title: 'Платим по £3 за отправленную посылку',
    description:
      'Когда клиент, привлеченный по вашей ссылке, отправляет посылку — на ваш счет поступает $3. Вы можете оплачивать этими деньгами ваши посылки или выводить их себе на счет.',
  },
  {
    icon: (
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F3FF] text-[#5b52a3] shadow-inner transition-transform group-hover:scale-110 duration-300">
        <MegaphoneSimple size={30} weight="fill" />
      </div>
    ),
    title: 'Промо на любой вкус',
    description:
      'Автоматические или персональные реферальные коды для отправки друзьям или подписчикам в мессенджеры или социальные сети, а также реферальные ссылки и баннеры для ваших сайтов.',
  },
  {
    icon: (
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7ED] text-[#ffa009] shadow-inner transition-transform group-hover:scale-110 duration-300">
        <DeviceMobile size={30} weight="fill" />
      </div>
    ),
    title: 'Выплаты по запросу',
    description:
      'Платим по первому вашему требованию без задержек и других сложностей. Если на счету менее $50 — вы можете тратить их на оплату товаров или доставки. Если больше — выводить на свой счет.',
  },
  {
    icon: (
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF5FF] text-[#b36cf5] shadow-inner transition-transform group-hover:scale-110 duration-300">
        <CurrencyCircleDollar size={30} weight="fill" />
      </div>
    ),
    title: 'Начисляем кэшбэк £1 на 1 посылку',
    description:
      'За каждую отправленную посылку , возможность оплатить после бонусного счета в 10 фунтов.',
  },
]

export function PartnersPage() {
  return (
    <div className="animate-fade-scale">
      {/* Шапка страницы */}
      <PageHero
        breadcrumbs={[
          { label: 'Главная', to: ROUTES.HOME },
          { label: 'Бонусы и партнёрская программа' },
        ]}
        title="Бонусы и партнёрская программа"
        subtitle="Платим $3 с каждой отправленной посылки"
      >
        <Link
          to={ROUTES.REGISTER}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-button transition-all duration-300 hover:scale-105 hover:bg-primary-light active:scale-95"
        >
          <span>Начать зарабатывать</span>
          <ArrowRight size={18} weight="bold" />
        </Link>
      </PageHero>

      <Container>
        {/* Заголовок секции */}
        <div className="mt-8 mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-[34px]">
            Зарабатывать с нами — проще простого:
          </h2>
        </div>

        {/* Сетка карточек преимуществ */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {BENEFITS.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col gap-4 rounded-[24px] border border-line/60 bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-card sm:p-9"
            >
              <div>{item.icon}</div>
              <h3 className="text-lg font-bold text-dark sm:text-xl transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Большой промо-баннер с иллюстрацией ракеты */}
        <div className="relative my-16 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#5B52A3] via-[#4884C6] to-[#41B7E9] text-white shadow-[0_16px_40px_rgba(91,82,163,0.3)] sm:rounded-[36px]">
          {/* Фоновое свечение */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-pulse-glow" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:p-14">
            {/* Иллюстрация слева */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative max-w-sm overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105">
                <img
                  src={rocketImg}
                  alt="Зарабатывайте с OkeyPost"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            {/* Контент справа */}
            <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-[38px] leading-tight">
                Готовы начать зарабатывать вместе с нами?
              </h3>
              <p className="mt-3 text-base font-normal text-white/90 sm:text-lg">
                Присоединяйтесь к партнерской программе Okeypost.com уже сегодня!
              </p>
              <Link
                to={ROUTES.REGISTER}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-button transition-all duration-300 hover:scale-105 hover:bg-primary-light active:scale-95"
              >
                <span>Присоединиться</span>
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
