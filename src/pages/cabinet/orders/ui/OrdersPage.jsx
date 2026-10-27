import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useOrderStore } from '@/entities/order'
import { useParcelStore } from '@/entities/parcel'
import { useTransactionStore } from '@/entities/transaction'
import { OrdersSection } from '@/widgets/orders-section'
import { ParcelsSection } from '@/widgets/parcels-section'
import { TransactionsSection } from '@/widgets/transactions-section'

// Figma: 17_ЛК_Заказы, 18_ЛК_Заказы_фильтр, 18_ЛК_Заказы_оплата (модалка)
// Три раздела на одной странице; меню «Посылки»/«Транзакции» ведёт сюда с якорем #parcels / #transactions
export function OrdersPage() {
  const { hash } = useLocation()
  const fetchOrders = useOrderStore((state) => state.fetchOrders)
  const fetchParcels = useParcelStore((state) => state.fetchParcels)
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions)

  useEffect(() => {
    fetchOrders()
    fetchParcels()
    fetchTransactions()
  }, [fetchOrders, fetchParcels, fetchTransactions])

  // React Router сам не прокручивает к якорю — делаем это вручную
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0 })
  }, [hash])

  return (
    <div className="flex flex-col gap-20">
      <OrdersSection />
      <ParcelsSection />
      <TransactionsSection />
    </div>
  )
}
