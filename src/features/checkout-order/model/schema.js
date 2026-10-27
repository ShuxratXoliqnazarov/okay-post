import { z } from 'zod'
import { moneyField, quantityField, requiredString, urlField } from '@/shared/lib'

const itemSchema = z.object({
  link: urlField,
  name: requiredString('Введите название товара').max(200, 'Максимум 200 символов'),
  quantity: quantityField,
  size: z.string().trim().max(20, 'Максимум 20 символов'),
  color: z.string().trim().max(30, 'Максимум 30 символов'),
  price: moneyField,
  comment: z.string().trim().max(500, 'Максимум 500 символов'),
})

export const checkoutSchema = z.object({
  items: z.array(itemSchema).min(1, 'Добавьте хотя бы один товар'),
})

export const EMPTY_ITEM = { link: '', name: '', quantity: '1', size: '', color: '', price: '', comment: '' }

export const itemsToFormValues = (items) =>
  items.map((item) => ({ ...item, quantity: String(item.quantity), price: String(item.price) }))

export const getShopFromLink = (link) => new URL(link).hostname.replace(/^www\./, '')
