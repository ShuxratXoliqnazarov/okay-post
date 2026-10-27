import { z } from 'zod'
import { PAYMENT_METHODS } from '@/entities/transaction'
import { moneyField } from '@/shared/lib'

export const topUpSchema = z
  .object({
    amount: moneyField,
    method: z.string({ error: 'Выберите способ оплаты' }).min(1, 'Выберите способ оплаты'),
  })
  .superRefine(({ amount, method }, ctx) => {
    const selected = PAYMENT_METHODS.find((item) => item.value === method)
    if (selected && amount > selected.limit) {
      ctx.addIssue({
        code: 'custom',
        path: ['amount'],
        message: `Через ${selected.label} — не больше £${selected.limit} за раз`,
      })
    }
  })
