import { VirtualOrderForm } from '@/features/create-virtual-order'
import { PageTitle } from '@/shared/ui'

// Figma: 19_ЛК_Заказы_Виртуальный заказ
export function VirtualOrderPage() {
  return (
    <>
      <PageTitle className="mb-8">Создание заказа, который Вы выкупаете самостоятельно</PageTitle>
      <VirtualOrderForm />
    </>
  )
}
