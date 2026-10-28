import { z } from 'zod'
import { emailField } from '@/shared/lib'

export const subscribeSchema = z.object({ email: emailField })
