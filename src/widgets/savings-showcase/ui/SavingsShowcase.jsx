import { useState } from 'react'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'
import { Container } from '@/shared/ui'
import * as images from '@/shared/assets/images/landing'
import { ADVANTAGES, SHOWCASE_CATEGORIES, SHOWCASE_PRODUCTS } from '../model/mock'

// Блок «Насколько выгодно покупать?»: категории, сравнение цены в России и в UK, преимущества
export function SavingsShowcase() {
  const [categoryId, setCategoryId] = useState('clothes')
  const [index, setIndex] = useState(1)

  const category = SHOWCASE_CATEGORIES.find((c) => c.id === categoryId)
  const products = SHOWCASE_PRODUCTS[categoryId]
  const at = (i) => products[(i + products.length) % products.length]
  const product = at(index)
  const prev = at(index - 1)
  const next = at(index + 1)

  const pickCategory = (id) => {
    setCategoryId(id)
    setIndex(Math.min(1, SHOWCASE_PRODUCTS[id].length - 1))
  }

  const step = (dir) => {
    const pos = SHOWCASE_CATEGORIES.findIndex((c) => c.id === categoryId)
    pickCategory(SHOWCASE_CATEGORIES[(pos + dir + SHOWCASE_CATEGORIES.length) % SHOWCASE_CATEGORIES.length].id)
  }

  return (
    <Container className="max-w-[1448px]">
      <h2 className="max-w-[460px] text-[28px] leading-snug font-extrabold sm:text-4xl lg:text-[40px] lg:leading-[50px]">Насколько выгодно покупать?</h2>

      <div className="mt-8 flex items-center rounded-2xl bg-white shadow-card sm:mt-12">
        <button type="button" onClick={() => step(-1)} aria-label="Предыдущая категория" className="flex h-[100px] w-12 shrink-0 cursor-pointer items-center justify-center text-primary sm:w-[70px]">
          <CaretLeftIcon size={22} />
        </button>

        <div role="tablist" className="no-scrollbar flex flex-1 overflow-x-auto">
          {SHOWCASE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === categoryId}
              onClick={() => pickCategory(c.id)}
              className={cn(
                'flex h-[100px] shrink-0 cursor-pointer items-center gap-4 px-5 text-sm font-bold transition-colors sm:px-8',
                c.id === categoryId ? 'bg-[#f0f4ff]' : 'hover:bg-surface',
              )}
            >
              <img src={images[c.icon]} alt="" className="size-[54px] mix-blend-multiply" />
              {c.label}
            </button>
          ))}
        </div>

        <button type="button" onClick={() => step(1)} aria-label="Следующая категория" className="flex h-[100px] w-12 shrink-0 cursor-pointer items-center justify-center text-primary sm:w-[70px]">
          <CaretRightIcon size={22} />
        </button>
      </div>

      {/* Сравнение цен */}
      <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1fr_450px_1fr] lg:gap-[76px]">
        <div className="order-2 lg:order-1">
          <h3 className="text-xl leading-9 font-bold sm:text-[24px]">{product.title}</h3>
          <PriceCard flag={images.flagRu} label="Цена в России" value={`${product.ru}₽`} className="mt-8 lg:mt-12" />
        </div>

        <ProductPicture product={product} category={category} className="order-1 mx-auto lg:order-2" />

        <div className="order-3">
          <h3 className="text-xl leading-9 font-bold sm:text-[24px]">
            Доставка одежды из Великобритании от <span className="text-primary">{product.delivery}</span>
          </h3>
          <PriceCard flag={images.flagUk} label="Цена в UK" value={product.uk} accent className="mt-8 lg:mt-12" />
        </div>
      </div>

      {/* Переключатель товаров и выгода */}
      <div className="mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6 lg:mt-6">
        <Thumb product={prev} onClick={() => setIndex(index - 1)} arrow="left" label="Предыдущий товар" />
        <div className="text-center">
          <p className="text-[15px] font-light">Срок доставки примерно {product.days} дней</p>
          <p className="mt-1 text-xl font-bold sm:text-2xl">
            Вы экономите до <span className="text-primary">{product.saving}</span>
          </p>
        </div>
        <Thumb product={next} onClick={() => setIndex(index + 1)} arrow="right" label="Следующий товар" />
      </div>

      <ul className="mt-16 grid rounded-2xl bg-white py-4 shadow-card sm:grid-cols-2 lg:mt-[150px] lg:h-[180px] lg:grid-cols-4 lg:items-center lg:py-0">
        {ADVANTAGES.map(({ id, icon, text }) => (
          <li key={id} className="flex items-center gap-5 px-8 py-5 lg:h-[136px] lg:justify-center lg:py-0 lg:not-first:border-l-2 lg:not-first:border-line/70">
            <img src={images[icon]} alt="" className="size-[62px] shrink-0 mix-blend-multiply" />
            <span className="max-w-[120px] text-base leading-6 font-bold">{text}</span>
          </li>
        ))}
      </ul>
    </Container>
  )
}

function PriceCard({ flag, label, value, accent, className }) {
  return (
    <div className={cn('flex items-center gap-6 rounded-2xl bg-[#f3f6ff] px-8 py-8', className)}>
      <img src={flag} alt="" className="h-[54px] w-[75px] rounded object-cover" />
      <div>
        <p className="text-[15px] font-light">{label}</p>
        <p className={cn('mt-1 text-2xl font-bold', accent && 'text-primary')}>{value}</p>
      </div>
    </div>
  )
}

// Большой круг с товаром; для категорий без фото — иконка категории
function ProductPicture({ product, category, className }) {
  const src = product.image ? images[product.image] : null
  return (
    <div className={cn('flex size-[280px] items-center justify-center rounded-full bg-[#f1f4ff] sm:size-[400px] lg:size-[450px]', className)}>
      {src ? (
        <img src={src} alt={product.title} className="size-full object-contain mix-blend-multiply" />
      ) : (
        <img src={images[category.icon]} alt={product.title} className="size-1/3 mix-blend-multiply" />
      )}
    </div>
  )
}

function Thumb({ product, onClick, arrow, label }) {
  const src = product.image ? images[product.image] : null
  const image = (
    <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f1f4ff] sm:size-[120px]">
      {src && <img src={src} alt="" className="size-full object-cover mix-blend-multiply" />}
    </span>
  )
  const Arrow = arrow === 'left' ? CaretLeftIcon : CaretRightIcon

  return (
    <button type="button" onClick={onClick} aria-label={`${label}: ${product.title}`} className={cn('flex cursor-pointer items-center gap-4 sm:gap-8', arrow === 'right' && 'flex-row-reverse')}>
      {image}
      <Arrow size={24} className="text-primary" />
    </button>
  )
}
