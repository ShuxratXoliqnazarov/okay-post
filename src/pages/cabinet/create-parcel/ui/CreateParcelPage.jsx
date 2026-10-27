import { useEffect } from 'react'
import { useAddressStore } from '@/entities/address'
import { ORDER_STATUS, useOrderStore } from '@/entities/order'
import { CreateParcelForm } from '@/features/create-parcel'
import { PageTitle } from '@/shared/ui'

// макет: 22_ЛК_Создание посылки
export function CreateParcelPage() {
  const { orders, isLoading: isOrdersLoading, fetchOrders } = useOrderStore()
  const { addresses, isLoading: isAddressesLoading, fetchAddresses } = useAddressStore()

  useEffect(() => {
    fetchOrders()
    fetchAddresses()
  }, [fetchOrders, fetchAddresses])

  // в посылку только то что уже на складе
  const receivedOrders = orders.filter((order) => order.status === ORDER_STATUS.RECEIVED)

  return (
    <>
      <PageTitle className="mb-8">Создание посылки</PageTitle>
      {isOrdersLoading || isAddressesLoading ? (
        <p className="text-muted">Загрузка...</p>
      ) : (
        <CreateParcelForm orders={receivedOrders} addresses={addresses} />
      )}
    </>
  )
}
