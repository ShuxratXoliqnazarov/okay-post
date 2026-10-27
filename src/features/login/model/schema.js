import { z } from 'zod'
import { emailField, requiredString } from '@/shared/lib'

// Во входе пароль проверяем только на заполненность — правила сложности есть в регистрации
export const loginSchema = z.object({
  email: emailField,
  password: requiredString('Введите пароль'),
})
