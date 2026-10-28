import { useState } from 'react'
import { Clock, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { ROUTES } from '@/shared/config'
import { Container, PageHero, SocialBanner } from '@/shared/ui'
import { cn } from '@/shared/lib'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Интернет-магазин Urban Outfitters в UK: обзор',
    date: '22.10.2021',
    readTime: '8 минут',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
    category: 'Мода и стиль',
  },
  {
    id: 2,
    title: 'Overstock. Брендовые товары по доступным ценам',
    date: '22.10.2021',
    readTime: '8 минут',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    category: 'Дом и уют',
  },
  {
    id: 3,
    title: 'Skechers с Amazon. Удобная обувь для всей семьи',
    date: '22.10.2021',
    readTime: '5 минут',
    image:
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
    category: 'Обувь',
  },
  {
    id: 4,
    title: '16 лучших подарков с Амазона в 2021 году',
    date: '22.10.2021',
    readTime: '9 минут',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    category: 'Идеи подарков',
  },
  {
    id: 5,
    title: 'Target — семейный супермаркет с ценами от 300 рублей!',
    date: '22.10.2021',
    readTime: '6 минут',
    image:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    category: 'Шопинг',
  },
  {
    id: 6,
    title: 'Английский магазин RIPNDIP. Покупаем самовыражение',
    date: '22.10.2021',
    readTime: '5 минут',
    image:
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    category: 'Стритвир',
  },
  {
    id: 7,
    title: 'Nautica. Элитные товары из Англии по низким ценам',
    date: '22.10.2021',
    readTime: '7 минут',
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    category: 'Премиум',
  },
  {
    id: 8,
    title: 'Forever 21 - покупаем джинсы за 1 500 рублей',
    date: '22.10.2021',
    readTime: '5 минут',
    image:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    category: 'Масс-маркет',
  },
  {
    id: 9,
    title: 'Как купить кроссовки Balenciaga на 30 000 рублей дешевле?',
    date: '22.10.2021',
    readTime: '6 минут',
    image:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    category: 'Лайфхаки',
  },
  {
    id: 10,
    title: 'Топ-7 самых дорогих сумок Louis Vuitton',
    date: '22.10.2021',
    readTime: '5 минут',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    category: 'Люкс',
  },
  {
    id: 11,
    title: 'BH Cosmetics Galaxy. Галактика красоты и ухода',
    date: '22.10.2021',
    readTime: '8 минут',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    category: 'Косметика',
  },
  {
    id: 12,
    title: '"Вансы". Крутые кеды, которые не выйдут из моды никогда!',
    date: '22.10.2021',
    readTime: '6 минут',
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    category: 'Обувь',
  },
]

export function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="animate-fade-scale">
      {/* Шапка страницы */}
      <PageHero
        breadcrumbs={[{ label: 'Главная', to: ROUTES.HOME }, { label: 'Блог' }]}
        title="Блог"
      />

      <Container>
        {/* Сетка статей блога */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-line/60 bg-white shadow-[0_4px_24px_rgba(31,36,40,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-card cursor-pointer"
            >
              {/* Превью изображения с плавным зумом */}
              <div className="relative h-56 w-full overflow-hidden bg-surface">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-dark backdrop-blur-sm shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Текстовая часть */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <h2 className="text-lg font-bold leading-snug text-dark transition-colors duration-200 group-hover:text-primary">
                  {post.title}
                </h2>

                {/* Мета-информация */}
                <div className="mt-6 flex items-center justify-between border-t border-line/50 pt-4 text-xs font-semibold text-muted">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1.5 text-muted group-hover:text-dark transition-colors">
                    <Clock size={16} weight="regular" />
                    <span>Читать: {post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

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
