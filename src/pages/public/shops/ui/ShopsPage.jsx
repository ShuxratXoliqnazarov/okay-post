import { useState, useMemo } from 'react'
import { MagnifyingGlass, CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { ROUTES } from '@/shared/config'
import { Container, PageHero, SocialBanner } from '@/shared/ui'
import { cn } from '@/shared/lib'

const SHOPS_DATA = [
  {
    id: 1,
    name: 'Primark (Форма заказа)',
    category: 'fashion',
    logo: (
      <span className="text-xl font-black tracking-widest text-[#00A0E2]">PRIMARK</span>
    ),
  },
  {
    id: 2,
    name: 'H&M',
    category: 'fashion',
    logo: (
      <span className="font-serif text-3xl font-black italic tracking-tighter text-[#E50010]">
        H&M
      </span>
    ),
  },
  {
    id: 3,
    name: 'Mangooutlet',
    category: 'fashion',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-xl font-black tracking-wider text-dark">MANGO</span>
        <span className="text-[10px] font-bold tracking-widest text-muted">OUTLET</span>
      </div>
    ),
  },
  {
    id: 4,
    name: 'Next',
    category: 'fashion',
    logo: <span className="text-2xl font-black tracking-tight text-dark">next</span>,
  },
  {
    id: 5,
    name: 'Sportdirect',
    category: 'sport',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-sm font-black tracking-tighter text-[#003893]">SPORTS</span>
        <span className="text-xs font-black tracking-tighter text-[#E21836]">DIRECT.COM</span>
      </div>
    ),
  },
  {
    id: 6,
    name: 'Clothing at Tesco',
    category: 'fashion',
    logo: (
      <div className="rounded border-2 border-dark px-2.5 py-0.5">
        <span className="text-xl font-bold tracking-wider text-dark">F&amp;F</span>
      </div>
    ),
  },
  {
    id: 7,
    name: 'George at ASDA',
    category: 'fashion',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-base font-bold text-[#78BE20]">ASDA</span>
        <span className="font-serif text-lg font-bold text-dark">George.</span>
      </div>
    ),
  },
  {
    id: 8,
    name: 'Accessorize',
    category: 'beauty',
    logo: (
      <span className="font-serif text-xl italic font-bold tracking-wide text-[#E81B85]">
        Accessorize
      </span>
    ),
  },
  {
    id: 9,
    name: 'Adidas UK',
    category: 'sport',
    logo: (
      <div className="flex flex-col items-center">
        <svg className="h-6 w-9" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.9 6.8l-1.9-3.3-2 3.3h3.9zm-4.7 0L6.4 3.7 4.5 7h3.7zm9.4 0l-1.9-3.3-2 3.3h3.9zm-2.8 5.2L12.9 8.7 11 12h3.8zm-4.7 0L8.2 8.7 6.3 12h3.8zm9.4 0l-1.9-3.3-2 3.3h3.9zM1.7 18.5h20.6l-2-3.5H3.6l-1.9 3.5z" />
        </svg>
        <span className="text-xs font-black tracking-wider text-dark mt-1">adidas</span>
      </div>
    ),
  },
  {
    id: 10,
    name: 'Amazon',
    category: 'all',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tracking-tight text-dark">amazon</span>
        <div className="h-1 w-12 rounded-full bg-[#FF9900]" />
      </div>
    ),
  },
  {
    id: 11,
    name: 'ASOS',
    category: 'fashion',
    logo: <span className="text-2xl font-black tracking-tight text-dark">asos</span>,
  },
  {
    id: 12,
    name: 'Boohoo',
    category: 'fashion',
    logo: <span className="text-2xl font-extrabold tracking-tight text-dark">boohoo</span>,
  },
  {
    id: 13,
    name: 'Crocs',
    category: 'fashion',
    logo: (
      <div className="flex items-center gap-1.5">
        <span className="h-3.5 w-3.5 rounded-full bg-[#78BE20]" />
        <span className="text-2xl font-black tracking-tight text-[#78BE20]">crocs™</span>
      </div>
    ),
  },
  {
    id: 14,
    name: 'Ebay',
    category: 'all',
    logo: (
      <div className="flex items-baseline text-2xl font-black">
        <span className="text-[#E53238]">e</span>
        <span className="text-[#0064D2]">b</span>
        <span className="text-[#F5AF02]">a</span>
        <span className="text-[#86B817]">y</span>
      </div>
    ),
  },
  {
    id: 15,
    name: 'Matalan',
    category: 'fashion',
    logo: <span className="text-xl font-black tracking-widest text-[#E31837]">MATALAN</span>,
  },
  {
    id: 16,
    name: 'Mothercare',
    category: 'kids',
    logo: <span className="text-xl font-bold tracking-tight text-[#002B49]">mothercare</span>,
  },
  {
    id: 17,
    name: 'New Look',
    category: 'fashion',
    logo: (
      <div className="flex flex-col items-center leading-none">
        <span className="font-serif text-sm font-semibold italic text-dark">new</span>
        <span className="text-base font-black tracking-wider text-dark">look</span>
      </div>
    ),
  },
  {
    id: 18,
    name: 'Puma',
    category: 'sport',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tracking-widest text-dark">PUMA</span>
      </div>
    ),
  },
  {
    id: 19,
    name: 'Timberland',
    category: 'fashion',
    logo: (
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold tracking-tight text-dark">Timberland</span>
      </div>
    ),
  },
  {
    id: 20,
    name: 'Showroomprive',
    category: 'fashion',
    logo: (
      <div className="flex items-center gap-1 text-sm font-black text-dark">
        <span>showroomprive</span>
        <span className="text-[#FF007A]">★</span>
        <span>com</span>
      </div>
    ),
  },
  {
    id: 21,
    name: 'Brand Alley',
    category: 'fashion',
    logo: <span className="text-lg font-black tracking-wider text-dark">BrandAlley</span>,
  },
  {
    id: 22,
    name: 'M&S',
    category: 'fashion',
    logo: (
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-semibold text-muted">YOUR</span>
        <span className="font-serif text-2xl font-bold text-dark">M&S</span>
      </div>
    ),
  },
  {
    id: 23,
    name: 'Clarks',
    category: 'fashion',
    logo: (
      <span className="font-serif text-2xl font-bold italic tracking-wide text-[#004B23]">
        Clarks
      </span>
    ),
  },
  {
    id: 24,
    name: 'Zara',
    category: 'fashion',
    logo: <span className="font-serif text-3xl font-black tracking-tighter text-dark">ZARA</span>,
  },
  {
    id: 25,
    name: 'Mango',
    category: 'fashion',
    logo: <span className="text-2xl font-black tracking-wider text-dark">MANGO</span>,
  },
  {
    id: 26,
    name: 'Zulily',
    category: 'kids',
    logo: <span className="font-serif text-2xl font-bold text-[#E21884]">Zulily</span>,
  },
  {
    id: 27,
    name: 'Panachekids',
    category: 'kids',
    logo: (
      <div className="flex items-center gap-1.5 text-sm font-bold text-dark">
        <span className="text-muted">♡</span>
        <span>Panache Kids</span>
      </div>
    ),
  },
  {
    id: 28,
    name: 'Betterware',
    category: 'all',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-[#00A3E0]">Betterware</span>
        <span className="text-[9px] text-muted">Hogar en armonía</span>
      </div>
    ),
  },
  {
    id: 29,
    name: 'Tucci Store',
    category: 'luxury',
    logo: (
      <div className="flex flex-col items-center">
        <span className="font-serif text-base font-black tracking-widest text-dark">TUCCI</span>
        <span className="text-[8px] font-bold tracking-widest text-muted">DESIGNER CLOTHING</span>
      </div>
    ),
  },
  {
    id: 30,
    name: 'Mini Mode',
    category: 'kids',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-muted text-xs">♔</span>
        <span className="text-xs font-bold tracking-widest text-dark">MINI MODE</span>
      </div>
    ),
  },
]

const CATEGORIES = [
  { id: 'all', label: 'Все магазины' },
  { id: 'fashion', label: 'Одежда и обувь' },
  { id: 'sport', label: 'Спорт' },
  { id: 'kids', label: 'Детские товары' },
  { id: 'beauty', label: 'Красота и аксессуары' },
  { id: 'luxury', label: 'Люкс и бренды' },
]

export function ShopsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Фильтрация магазинов
  const filteredShops = useMemo(() => {
    return SHOPS_DATA.filter((shop) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        shop.category === selectedCategory ||
        shop.category === 'all'
      const matchesSearch =
        !searchQuery.trim() ||
        shop.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="animate-fade-scale">
      {/* Шапка страницы */}
      <PageHero
        breadcrumbs={[
          { label: 'Главная', to: ROUTES.HOME },
          { label: 'Популярные магазины' },
        ]}
        title="Популярные магазины"
      />

      <Container>
        {/* Фильтры и поиск */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Категории */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200',
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-[0_2px_12px_rgba(0,201,123,0.3)] scale-105'
                    : 'bg-surface text-muted hover:bg-line/40 hover:text-dark'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Быстрый поиск */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск магазина..."
              className="w-full rounded-full border border-line bg-white py-2 pl-10 pr-9 text-xs sm:text-sm text-dark placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            />
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <MagnifyingGlass size={16} weight="bold" />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Очистить"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>
        </div>

        {/* Сетка 30 карточек магазинов (5 колонок) */}
        {filteredShops.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-12 text-center text-muted shadow-sm">
            <p className="text-lg font-semibold text-dark">Магазин не найден</p>
            <p className="mt-2 text-sm">
              Попробуйте ввести другое название или выберите категорию «Все магазины».
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="group flex min-h-[160px] flex-col items-center justify-between rounded-[20px] border border-line/60 bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-card cursor-pointer"
              >
                {/* Логотип по центру */}
                <div className="flex flex-1 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {shop.logo}
                </div>

                {/* Название бренда под логотипом */}
                <p className="mt-3 text-xs font-semibold text-muted transition-colors group-hover:text-dark">
                  {shop.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Пагинация */}
        <div className="mt-14 mb-8 flex items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Предыдущая страница"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/80 text-muted transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <CaretLeft size={16} weight="bold" />
          </button>

          {[1, 2].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-200',
                currentPage === page
                  ? 'border-2 border-primary text-primary shadow-[0_2px_12px_rgba(0,201,123,0.25)] scale-105'
                  : 'border border-line/80 text-dark hover:border-primary hover:text-primary'
              )}
            >
              {page}
            </button>
          ))}

          <span className="px-1 text-sm font-semibold text-muted">...</span>

          {[23, 24].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-200',
                currentPage === page
                  ? 'border-2 border-primary text-primary shadow-[0_2px_12px_rgba(0,201,123,0.25)] scale-105'
                  : 'border border-line/80 text-dark hover:border-primary hover:text-primary'
              )}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(24, p + 1))}
            disabled={currentPage === 24}
            aria-label="Следующая страница"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/80 text-muted transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </Container>

      {/* Баннер соцсетей */}
      <SocialBanner />
    </div>
  )
}
