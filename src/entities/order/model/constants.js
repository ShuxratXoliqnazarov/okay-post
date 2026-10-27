// Статусы заказа (по тексту «Информация по работе с сайтом»)
export const ORDER_STATUS = {
  DRAFT: 'draft', // сохранён, но не отправлен (кнопка «Сохранить» на экране 20)
  AWAITING_PAYMENT: 'awaiting_payment', // отправлен, ждёт предоплаты
  PROCESSING: 'processing', // оплачен, оператор выкупает
  BOUGHT: 'bought', // выкуплен нами или виртуальный заказ клиента
  RECEIVED: 'received', // пришёл на склад — можно добавить в посылку
  PACKED: 'packed', // упакован в посылку
  SENT: 'sent', // отправлен
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

// virtual — клиент выкупил сам (экран 19), purchase — выкупает оператор (экран 20)
export const ORDER_TYPE = {
  VIRTUAL: 'virtual',
  PURCHASE: 'purchase',
}

// Сумма заказа: у оператора — сумма товаров, у виртуального — указанная клиентом
export const getOrderAmount = (order) =>
  order.type === ORDER_TYPE.PURCHASE
    ? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : order.amount
