import { z } from 'zod'

export const PERIOD_OPTIONS = [
  { value: 'this-month', label: 'Этот месяц' },
  { value: 'last-month', label: 'Прошлый месяц' },
  { value: 'three-months', label: 'Последние 3 месяца' },
  { value: 'this-year', label: 'Этот год' },
]

// mode: period | range | all
export const ordersFilterSchema = z
  .object({
    mode: z.enum(['period', 'range', 'all']),
    period: z.string(),
    from: z.string(),
    to: z.string(),
    orderId: z.string().trim().regex(/^\d*$/, 'ID — только цифры'),
  })
  .superRefine((data, ctx) => {
    if (data.mode !== 'range') return
    if (!data.from) ctx.addIssue({ code: 'custom', path: ['from'], message: 'Укажите дату' })
    if (!data.to) ctx.addIssue({ code: 'custom', path: ['to'], message: 'Укажите дату' })
    if (data.from && data.to && data.from > data.to) {
      ctx.addIssue({ code: 'custom', path: ['to'], message: 'Конец раньше начала' })
    }
  })

export const DEFAULT_ORDERS_FILTER = { mode: 'all', period: 'this-month', from: '', to: '', orderId: '' }

function getPeriodStart(period, now = new Date()) {
  const year = now.getFullYear()
  const month = now.getMonth()
  switch (period) {
    case 'last-month':
      return [new Date(year, month - 1, 1), new Date(year, month, 1)]
    case 'three-months':
      return [new Date(year, month - 2, 1), null]
    case 'this-year':
      return [new Date(year, 0, 1), null]
    default:
      return [new Date(year, month, 1), null]
  }
}

export function filterOrders(orders, filter) {
  return orders.filter((order) => {
    if (filter.orderId && !String(order.id).includes(filter.orderId)) return false

    const date = new Date(order.createdAt)
    if (filter.mode === 'period') {
      const [start, end] = getPeriodStart(filter.period)
      if (date < start || (end && date >= end)) return false
    }
    if (filter.mode === 'range') {
      if (date < new Date(filter.from) || date > new Date(`${filter.to}T23:59:59`)) return false
    }
    return true
  })
}
