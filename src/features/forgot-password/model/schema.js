import { z } from 'zod'
import { emailField } from '@/shared/lib'

export const forgotPasswordSchema = z.object({
  email: emailField,
})
