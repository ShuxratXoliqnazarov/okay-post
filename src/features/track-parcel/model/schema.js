import { z } from 'zod'

export const trackSchema = z.object({
  trackNumber: z
    .string()
    .trim()
    .min(8, 'Минимум 8 символов')
    .max(20, 'Максимум 20 символов'),
})
