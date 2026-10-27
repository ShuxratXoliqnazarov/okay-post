import { z } from 'zod'
import { passwordField, requiredString } from '@/shared/lib'

export const changePasswordSchema = z
  .object({
    oldPassword: requiredString('Введите старый пароль'),
    newPassword: passwordField,
    confirmPassword: requiredString('Повторите новый пароль'),
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'Новый пароль должен отличаться от старого',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
