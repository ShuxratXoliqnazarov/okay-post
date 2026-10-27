import { TRANSACTION_STATUS, TRANSACTION_TYPE } from './constants'

// amount в фунтах: плюс — зачисление, минус — списание. balanceAfter — «Остаток» после операции.
export const TRANSACTIONS_SEED = [
  {
    id: 301,
    userId: 1,
    createdAt: '2026-10-05T15:00:00.000Z',
    type: TRANSACTION_TYPE.PAYMENT,
    method: 'bank',
    description: 'Оплата за посылку ID 201',
    amount: -22.5,
    cashback: 0,
    balanceAfter: 0,
    status: TRANSACTION_STATUS.PENDING,
    parcelId: 201,
  },
  {
    id: 302,
    userId: 1,
    createdAt: '2026-10-25T10:05:00.000Z',
    type: TRANSACTION_TYPE.PAYMENT,
    method: 'card',
    description: 'Оплата заказа ID 35651',
    amount: -568,
    cashback: 0,
    balanceAfter: 0,
    status: TRANSACTION_STATUS.DONE,
  },
]
