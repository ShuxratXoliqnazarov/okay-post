import { cn } from '@/shared/lib'

const priceWidth = {
  half: 'w-[110px] sm:w-[165px]',
  full: 'w-[130px] sm:w-[240px] lg:w-[357px]',
  split: 'w-1/2',
}

// Строка прайса: слева название (и пояснение), справа через вертикальную линию — цена
export function PriceRow({ item, className }) {
  return (
    <li className={cn('flex min-h-[80px] items-stretch rounded-2xl bg-white shadow-card', item.layout === 'split' && 'min-h-[84px]', className)}>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-4 pr-4 pl-5 sm:pl-[38px]">
        <h3 className="text-base font-bold">{item.title}</h3>
        {item.note && <p className="mt-1.5 text-xs leading-relaxed font-light">{item.note}</p>}
      </div>

      <div className="my-2.5 flex items-center border-l-2 border-line/70">
        <p className={cn('px-4 text-[13px] leading-6 font-bold sm:px-[30px]', priceWidth[item.layout])}>
          {item.price.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </li>
  )
}
