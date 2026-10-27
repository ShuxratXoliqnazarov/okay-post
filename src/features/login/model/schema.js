import { z } from 'zod'
import { emailField, requiredString } from '@/shared/lib'

// тут только проверяем что пароль не пустой
export const loginSchema = z.object({
  email: emailField,
  password: requiredString('Введите пароль'),
})
