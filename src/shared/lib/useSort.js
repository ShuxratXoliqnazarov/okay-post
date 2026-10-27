import { useMemo, useState } from 'react'

export function useSort(items, initialSort = { key: null, direction: 'asc' }) {
  const [sort, setSort] = useState(initialSort)

  const sorted = useMemo(() => {
    if (!sort.key) return items
    const modifier = sort.direction === 'asc' ? 1 : -1
    return [...items].sort((a, b) => {
      const first = a[sort.key] ?? ''
      const second = b[sort.key] ?? ''
      if (typeof first === 'number' && typeof second === 'number') return (first - second) * modifier
      return String(first).localeCompare(String(second), 'ru', { numeric: true }) * modifier
    })
  }, [items, sort])

  const toggleSort = (key) =>
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))

  return { sorted, sort, toggleSort }
}
