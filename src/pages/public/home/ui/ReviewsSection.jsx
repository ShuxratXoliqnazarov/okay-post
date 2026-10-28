import { REVIEWS, ReviewCard } from '@/entities/review'
import { ROUTES } from '@/shared/config'
import { Button, Container } from '@/shared/ui'
import * as images from '@/shared/assets/images/landing'
import { BENEFITS } from '../model/content'

const PHOTOS = { review1: images.review1, review2: images.review2, review3: images.review3, review4: images.review4 }

// «120 000 довольных клиентов…»: преимущества и отзывы с фото посылок
export function ReviewsSection() {
  return (
    <Container className="max-w-[1448px]">
      <h2 className="max-w-[820px] text-[28px] leading-snug font-extrabold sm:text-4xl lg:text-[40px] lg:leading-[56px]">
        120 000 довольных клиентов в России уже сделали свой выбор
      </h2>
      <p className="mt-6 max-w-[580px] text-base leading-8 font-light sm:text-lg sm:leading-9">
        За последний год десятки тысяч наших клиентов заказали товары из Англии и оставили 19 633 отзыва
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-[30px]">
        {BENEFITS.map((benefit) => (
          <li key={benefit.id} className="rounded-3xl bg-white p-8 shadow-card lg:min-h-[250px] lg:p-[37px]">
            <img src={images[benefit.icon]} alt="" className="size-[54px] mix-blend-multiply" />
            <h3 className="mt-9 text-base font-bold">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-[26px] font-light">{benefit.text}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 text-3xl font-extrabold lg:mt-[90px] lg:text-4xl">Отзывы и цитаты блогеров:</h3>
      <div className="mt-9 grid gap-6 lg:grid-cols-2 lg:gap-[30px]">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} photo={PHOTOS[review.photo]} />
        ))}
      </div>

      <Button to={ROUTES.BLOG} className="mt-10 h-[66px] px-12 text-[17px]">
        Все отзывы
      </Button>
    </Container>
  )
}
