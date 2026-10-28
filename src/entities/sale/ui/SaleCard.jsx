import { Fragment } from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

// Разбирает **жирный** и {{зелёный}} в строке описания
function RichLine({ text }) {
  const parts = text.split(/(\*\*.+?\*\*|\{\{.+?\}\})/g).filter(Boolean)
  return parts.map((part, i) => {
    if (part.startsWith('**')) return <b key={i} className="font-bold">{part.slice(2, -2)}</b>
    if (part.startsWith('{{')) return <span key={i} className="font-bold text-primary">{part.slice(2, -2)}</span>
    return <Fragment key={i}>{part}</Fragment>
  })
}

// Карточка распродажи: фото магазина слева, справа название, условия и ссылка
export function SaleCard({ sale, photo, onAction, className }) {
  return (
    <article className={cn('flex flex-col gap-6 sm:flex-row sm:gap-14', className)}>
      <img
        src={photo}
        alt={sale.shop}
        loading="lazy"
        className="aspect-[328/360] w-full rounded-3xl object-cover sm:w-[328px] sm:shrink-0 md:w-[240px] lg:w-[328px]"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[22px] leading-tight font-bold">{sale.shop}</h3>

        <div className="mt-5 flex flex-col gap-4 text-[15px] leading-9 font-light">
          {sale.groups.map((lines, gi) => (
            <p key={gi}>
              {lines.map((line, li) => (
                <Fragment key={li}>
                  {li > 0 && <br />}
                  <RichLine text={line} />
                </Fragment>
              ))}
            </p>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onAction?.(sale)}
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-[15px] font-bold text-primary hover:text-primary-dark"
        >
          {sale.action}
          <ArrowRightIcon size={14} weight="bold" />
        </button>
      </div>
    </article>
  )
}
