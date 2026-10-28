import { Container } from '@/shared/ui'
import * as images from '@/shared/assets/images/landing'

// Четыре карточки сверху страницы «Цены»: иллюстрация, описание услуги и её цена
export function HighlightsSection({ items }) {
  return (
    <Container className="max-w-[1448px]">
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[50px]">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col">
            <img src={images[item.image]} alt="" loading="lazy" className="h-[300px] w-auto max-w-full self-start object-contain" />
            <h3 className="mt-12 max-w-[300px] text-[22px] leading-9 font-bold">{item.title}</h3>
            <p className="mt-3 max-w-[300px] text-[15px] leading-9 font-light">{item.text}</p>
            <span className="mt-6 inline-flex h-14 w-[180px] items-center justify-center rounded-lg bg-accent text-[13px] font-bold text-white">
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  )
}
