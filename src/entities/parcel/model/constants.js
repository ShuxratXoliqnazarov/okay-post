export const PARCEL_STATUS = {
  REQUESTED: 'requested',
  PROCESSING: 'processing',
  AWAITING_PAYMENT: 'awaiting_payment',
  FORMED: 'formed',
  SENT: 'sent',
}

export const PARCEL_STATUS_LABEL = {
  [PARCEL_STATUS.REQUESTED]: 'Запрос отправлен',
  [PARCEL_STATUS.PROCESSING]: 'В обработке',
  [PARCEL_STATUS.AWAITING_PAYMENT]: 'Ожидает оплаты и заполнения декларации',
  [PARCEL_STATUS.FORMED]: 'Сформирована',
  [PARCEL_STATUS.SENT]: 'Отправлена',
}

// TODO: уточнить список доставок
export const DELIVERY_METHODS = [
  { value: 'russian-post', label: 'Почта России' },
  { value: 'dhl', label: 'DHL Express' },
  { value: 'ems', label: 'EMS' },
  { value: 'superfast', label: 'Суперфаст' },
  { value: 'fastbox', label: 'Фастбокс' },
]

export const PARCEL_SERVICES = [
  { value: 'consolidation', label: 'Консолидация' },
  { value: 'remove-invoice', label: 'Удаление инвойса' },
  { value: 'extra-packing', label: 'Дополнительная упаковка' },
  { value: 'fragile-packing', label: 'Упаковка хрупких предметов' },
  { value: 'declaration', label: 'Заполнение декларации' },
  { value: 'split-order', label: 'Разделение заказа' },
]

export const getDeliveryLabel = (value) =>
  DELIVERY_METHODS.find((method) => method.value === value)?.label ?? value

export const getServiceLabel = (value) =>
  PARCEL_SERVICES.find((service) => service.value === value)?.label ?? value
