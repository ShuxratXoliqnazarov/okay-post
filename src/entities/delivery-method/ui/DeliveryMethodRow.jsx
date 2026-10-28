import { useState } from 'react'
import { CaretDownIcon, InfoIcon } from '@phosphor-icons/react'
import { cn, formatMoney } from '@/shared/lib'

// Одна строка из списка «Варианты доставки»: название, сроки, стоимость, итого и раскрывающиеся детали
export function DeliveryMethodRow({ method, icon, total }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="rounded-2xl bg-white shadow-card">
      <div className="flex flex-wrap items-stretch lg:flex-nowrap">
        <div className="flex min-w-0 flex-1 basis-full items-center gap-4 p-4 sm:gap-5 sm:pl-7 lg:basis-auto">
          <img src={icon} alt="" className="size-11 shrink-0 sm:size-[54px]" />
          <span className="text-base font-bold uppercase">{method.name}</span>
        </div>

        <div className="my-3 flex flex-1 items-stretch lg:my-3 lg:flex-none">
          <Cell label="Сроки:" className="lg:w-[209px]">
            {method.days}
          </Cell>
          <Cell label="Стоимость доставки:" className="lg:w-[230px]">
            от {formatMoney(method.from)}
            <InfoIcon size={16} weight="fill" className="ml-2 inline text-line" aria-label="Подробнее о стоимости" />
          </Cell>
          <Cell label="Итого:" className="lg:w-[186px]">
            {formatMoney(total)}
          </Cell>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Показать детали"
          className="my-3 flex w-12 shrink-0 cursor-pointer items-center justify-center border-l-2 border-line/70 text-primary sm:w-[52px]"
        >
          <CaretDownIcon size={18} className={cn('transition-transform', open && 'rotate-180')} />
        </button>
      </div>

      {open && <p className="border-t border-line/60 px-7 py-4 text-sm leading-relaxed font-light">{method.details}</p>}
    </li>
  )
}

function Cell({ label, className, children }) {
  return (
    <div className={cn('flex flex-1 flex-col justify-center border-l-2 border-line/70 px-4 text-base font-bold sm:px-9 lg:flex-none', className)}>
      <span className="mb-0.5 text-xs font-light">{label}</span>
      <span className="whitespace-nowrap">{children}</span>
    </div>
  )
}
