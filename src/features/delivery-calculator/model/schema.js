import { z } from 'zod'
import { requiredString } from '@/shared/lib'

export const deliveryCalculatorSchema = z.object({
  country: requiredString('Выберите страну'),
  city: requiredString('Введите город'),
  // Индекс необязателен, но если введён — это 6 цифр
  index: z.string().trim().regex(/^(\d{6})?$/, 'Индекс — 6 цифр'),
  weight: z
    .string()
    .trim()
    .transform((value) => Number(value.replace(',', '.')))
    .pipe(z.number({ message: 'Введите вес' }).positive('Вес больше 0').max(30, 'Не больше 30 кг')),
  services: z.string(),
})
