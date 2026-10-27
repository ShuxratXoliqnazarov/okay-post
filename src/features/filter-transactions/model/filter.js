import { z } from 'zod'

export const transactionsFilterSchema = z
  .object({
    from: z.string(),
    to: z.string(),
    type: z.string(), // '' = все
  })
  .refine((data) => !data.from || !data.to || data.from <= data.to, {
    message: 'Конец периода раньше начала',
    path: ['to'],
  })

export const DEFAULT_TRANSACTIONS_FILTER = { from: '', to: '', type: '' }

export function filterTransactions(transactions, filter) {
  return transactions.filter((transaction) => {
    const date = new Date(transaction.createdAt)
    if (filter.type && transaction.type !== filter.type) return false
    if (filter.from && date < new Date(filter.from)) return false
    if (filter.to && date > new Date(`${filter.to}T23:59:59`)) return false
    return true
  })
}
