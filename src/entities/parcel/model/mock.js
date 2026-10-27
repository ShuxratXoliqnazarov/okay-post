import { PARCEL_STATUS } from './constants'

export const PARCELS_SEED = [
  {
    id: 201,
    userId: 1,
    createdAt: '2026-10-02T09:00:00.000Z',
    orderIds: [35650],
    addressId: 401,
    recipientName: 'Karimov D. V.',
    deliveryMethod: 'russian-post',
    services: ['extra-packing'],
    trackNumber: '35657455466446',
    actualWeight: 1.5,
    dimensions: '50x50x50',
    totalWeight: 2.5,
    cost: 22.5,
    status: PARCEL_STATUS.AWAITING_PAYMENT,
  },
]
