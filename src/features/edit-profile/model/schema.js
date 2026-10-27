import { z } from 'zod'
import { emailField, loginField, nameField, phoneField } from '@/shared/lib'

export const editProfileSchema = z.object({
  firstName: nameField,
  lastName: nameField,
  address: z.string().trim().max(200, 'Максимум 200 символов'),
  login: loginField,
  phone: phoneField,
  email: emailField,
  subscribed: z.boolean(),
})

// Фото профиля: только картинки до 2 МБ (localStorage небольшой)
export const AVATAR_MAX_SIZE = 2 * 1024 * 1024
export const AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function validateAvatar(file) {
  if (!AVATAR_TYPES.includes(file.type)) return 'Можно загрузить только JPG, PNG или WEBP'
  if (file.size > AVATAR_MAX_SIZE) return 'Файл больше 2 МБ'
  return ''
}
