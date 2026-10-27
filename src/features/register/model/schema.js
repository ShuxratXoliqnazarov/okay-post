import { z } from 'zod'
import { emailField, nameField, passwordField, phoneField } from '@/shared/lib'

export const registerSchema = z
  .object({
    name: nameField,
    phone: phoneField,
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, 'Повторите пароль'),
    agree: z.boolean().refine((value) => value, 'Необходимо согласие с условиями'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
