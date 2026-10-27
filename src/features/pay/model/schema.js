import { z } from 'zod'
import { PAYMENT_METHODS } from '@/entities/transaction'

// Схема зависит от суммы: у каждого способа оплаты свой лимит за один платёж
export const createPaymentSchema = (amount) =>
  z
    .object({
      method: z.string({ error: 'Выберите метод оплаты' }).min(1, 'Выберите метод оплаты'),
    })
    .superRefine(({ method }, ctx) => {
      const selected = PAYMENT_METHODS.find((item) => item.value === method)
      if (selected && amount > selected.limit) {
        ctx.addIssue({
          code: 'custom',
          path: ['method'],
          message: `Через ${selected.label} можно оплатить не больше £${selected.limit} за раз`,
        })
      }
    })
