import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

// Пагинация из макета: стрелки, 1, 2, …, 23, 24. Данных на всех страницах пока нет — переключается только номер
export function Pagination({ page, total, onChange }) {
  const pages = [1, 2, '…', total - 1, total]
  const itemClass = 'flex size-[42px] items-center justify-center rounded-full border text-sm transition-colors'

  return (
    <nav aria-label="Страницы" className="flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Предыдущая страница"
        className={cn(itemClass, 'border-line text-muted enabled:hover:border-primary enabled:hover:text-primary')}
      >
        <ArrowLeftIcon size={14} />
      </button>

      {pages.map((item, i) =>
        item === '…' ? (
          <span key={i} className="px-1 text-muted">
            …
          </span>
        ) : (
          <button
            key={i}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(itemClass, item === page ? 'border-primary text-primary' : 'border-line text-muted hover:border-primary hover:text-primary')}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        aria-label="Следующая страница"
        className={cn(itemClass, 'border-line text-muted enabled:hover:border-primary enabled:hover:text-primary')}
      >
        <ArrowRightIcon size={14} />
      </button>
    </nav>
  )
}
