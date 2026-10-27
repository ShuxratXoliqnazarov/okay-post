export const ORDER_STATUS = {
  DRAFT: 'draft', // черновик
  AWAITING_PAYMENT: 'awaiting_payment', // ждет оплату
  PROCESSING: 'processing', // оператор выкупает
  BOUGHT: 'bought',
  RECEIVED: 'received', // можно класть в посылку
  PACKED: 'packed',
  SENT: 'sent',
}

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.DRAFT]: 'Черновик',
  [ORDER_STATUS.AWAITING_PAYMENT]: 'Ожидает оплаты',
  [ORDER_STATUS.PROCESSING]: 'В обработке',
  [ORDER_STATUS.BOUGHT]: 'Выкуплен',
  [ORDER_STATUS.RECEIVED]: 'Пришёл на склад',
  [ORDER_STATUS.PACKED]: 'Упакован в посылку',
  [ORDER_STATUS.SENT]: 'Отправлен',
}

// virtual - сам выкупил, purchase - выкупает оператор
export const ORDER_TYPE = {
  VIRTUAL: 'virtual',
  PURCHASE: 'purchase',
}

export const getOrderAmount = (order) =>
  order.type === ORDER_TYPE.PURCHASE
    ? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : order.amount
