import { z } from 'zod'

export const createParcelSchema = z.object({
  orderIds: z.array(z.string()).min(1, 'Выберите хотя бы один заказ'),
  addressId: z.string(), // '' — «Не выбрано (Заполню позже)»
  deliveryMethod: z.string().min(1, 'Выберите тип доставки'),
  services: z.array(z.string()),
})
