import { z } from 'zod'
import { urlField } from '@/shared/lib'

export const orderByLinkSchema = z.object({ link: urlField })
