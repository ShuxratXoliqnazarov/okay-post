export const TRANSACTION_TYPE = {
  DEPOSIT: 'deposit',
  PAYMENT: 'payment',
  REFUND: 'refund',
}

export const TRANSACTION_TYPE_LABEL = {
  [TRANSACTION_TYPE.DEPOSIT]: 'Пополнение',
  [TRANSACTION_TYPE.PAYMENT]: 'Оплата',
  [TRANSACTION_TYPE.REFUND]: 'Возврат',
}

export const TRANSACTION_STATUS = {
  PENDING: 'pending', // не оплачено
  DONE: 'done',
}

export const TRANSACTION_STATUS_LABEL = {
  [TRANSACTION_STATUS.PENDING]: 'Ожидает оплаты',
  [TRANSACTION_STATUS.DONE]: 'Проведена',
}

export const PAYMENT_METHODS = [
  { value: 'card', label: 'VISA/MASTERCARD', limit: 100 },
  { value: 'paypal', label: 'PAYPAL', limit: 250 },
]

export const PAYMENT_METHOD_LABEL = {
  card: 'Visa/Mastercard',
  paypal: 'PayPal',
  bank: 'Банковский перевод',
}
