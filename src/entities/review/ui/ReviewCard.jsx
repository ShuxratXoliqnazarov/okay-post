import { StarIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

// Карточка отзыва: фото посылки слева, справа имя, звёзды, текст, дата и город
export function ReviewCard({ review, photo, className }) {
  return (
    <article className={cn('flex flex-col gap-5 rounded-3xl bg-white p-2.5 shadow-card sm:flex-row sm:gap-9', className)}>
      <img src={photo} alt="" className="aspect-square w-full rounded-2xl object-cover sm:size-[240px] sm:shrink-0" />

      <div className="flex flex-1 flex-col px-3 pb-4 sm:py-4 sm:pr-4 sm:pl-0">
        <h3 className="text-base font-bold">{review.name}</h3>
        <div className="mt-2 flex gap-0.5 text-warning" aria-label={`Оценка ${review.rating} из 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} size={16} weight="fill" className={i < review.rating ? '' : 'opacity-25'} />
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-relaxed font-light">{review.text}</p>

        <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 pt-6 text-sm">
          <dt className="font-bold">Дата:</dt>
          <dd className="font-light">{review.date}</dd>
          <dt className="font-bold">Город:</dt>
          <dd className="font-light">{review.city}</dd>
        </dl>
      </div>
    </article>
  )
}
