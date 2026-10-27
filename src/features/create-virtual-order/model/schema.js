import { z } from 'zod'
import { moneyField, requiredString, trackNumberField } from '@/shared/lib'

export const virtualOrderSchema = z.object({
  trackNumber: trackNumberField,
  amount: moneyField,
  shop: requiredString('Укажите магазин').max(50, 'Максимум 50 символов'),
})
