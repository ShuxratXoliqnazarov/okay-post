import { CaretDownIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

/*
  Таблица из макета: светлая шапка, строки с тонкими разделителями.
  На узких экранах прокручивается по горизонтали внутри своего контейнера.

    <Table>
      <thead><tr><SortableHeader sortKey="createdAt" sort={sort} onSort={toggleSort}>Дата</SortableHeader></tr></thead>
      <tbody><tr><Td>01.10.2026</Td></tr></tbody>
    </Table>
*/
export function Table({ className, children }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[960px] border-collapse text-left text-[13px]">{children}</table>
    </div>
  )
}

export function Th({ className, children }) {
  return (
    <th className={cn('bg-surface px-5 py-4 text-sm font-bold whitespace-nowrap text-dark first:rounded-l-md last:rounded-r-md', className)}>
      {children}
    </th>
  )
}

export function SortableHeader({ sortKey, sort, onSort, className, children }) {
  const isActive = sort.key === sortKey
  return (
    <Th className={className}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn('inline-flex items-center gap-1 hover:text-primary', isActive && 'text-primary')}
      >
        {children}
        <CaretDownIcon
          size={12}
          weight="bold"
          className={cn('transition-transform', isActive && sort.direction === 'asc' && 'rotate-180')}
        />
      </button>
    </Th>
  )
}

export function Tr({ className, children }) {
  return <tr className={cn('border-b border-line', className)}>{children}</tr>
}

export function Td({ className, children }) {
  return <td className={cn('px-5 py-3 font-light whitespace-nowrap text-dark', className)}>{children}</td>
}

// Строка «нет данных» на всю ширину таблицы
export function EmptyRow({ colSpan, children = 'Нет ни одной записи по текущему состоянию' }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-5 py-8 text-center text-sm text-muted">
        {children}
      </td>
    </tr>
  )
}
