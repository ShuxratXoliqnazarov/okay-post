// Статусы посылки и их подписи для UI
export const PARCEL_STATUS = {
  CREATED: 'created',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
}

export const PARCEL_STATUS_LABEL = {
  [PARCEL_STATUS.CREATED]: 'Создана',
  [PARCEL_STATUS.IN_TRANSIT]: 'В пути',
  [PARCEL_STATUS.DELIVERED]: 'Доставлена',
}
