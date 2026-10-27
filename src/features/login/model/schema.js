import { z } from 'zod'

// Схема валидации формы входа
export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'Введите номер телефона')
    .regex(/^\+998\d{9}$/, 'Формат: +998XXXXXXXXX'),
  password: z.string().min(6, 'Минимум 6 символов'),
})
