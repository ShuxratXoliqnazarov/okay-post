import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ORDER_STATUS, orderApi } from '@/entities/order'
import { CheckoutOrderForm } from '@/features/checkout-order'
import { Alert, PageTitle } from '@/shared/ui'

// Figma: 20_ЛК_Заказы_Оформление заказа. ?id=123 — продолжить сохранённый черновик
export function OrderCheckoutPage() {
  const [searchParams] = useSearchParams()
  const draftId = Number(searchParams.get('id'))
  const [draft, setDraft] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(draftId))

  useEffect(() => {
    if (!draftId) return
    orderApi
      .getById(draftId)
      .then((order) => setDraft(order?.status === ORDER_STATUS.DRAFT ? order : null))
      .finally(() => setIsLoading(false))
  }, [draftId])

  return (
    <>
      <PageTitle className="mb-6">Оформление заказа</PageTitle>
      {isLoading && <p className="text-muted">Загрузка...</p>}
      {!isLoading && draftId > 0 && !draft && (
        <Alert variant="error" className="mb-6 max-w-[634px]">
          Черновик не найден — оформите новый заказ
        </Alert>
      )}
      {!isLoading && <CheckoutOrderForm key={draft?.id ?? 'new'} order={draft} />}
    </>
  )
}
