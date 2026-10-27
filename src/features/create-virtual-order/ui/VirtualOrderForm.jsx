import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ORDER_STATUS, ORDER_TYPE, useOrderStore } from '@/entities/order'
import { ROUTES } from '@/shared/config'
import { Alert, Button, Input } from '@/shared/ui'
import { virtualOrderSchema } from '../model/schema'

export function VirtualOrderForm() {
  const navigate = useNavigate()
  const addOrder = useOrderStore((state) => state.addOrder)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(virtualOrderSchema),
    mode: 'onTouched',
    defaultValues: { trackNumber: '', amount: '', shop: '' },
  })

  const onSubmit = async (data) => {
    try {
      await addOrder({
        ...data,
        type: ORDER_TYPE.VIRTUAL,
        status: ORDER_STATUS.BOUGHT,
        weight: 0,
        comment: '',
        items: [],
      })
      navigate(ROUTES.CABINET_ORDERS)
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-[1056px] flex-col gap-6">
      <div className="grid gap-x-6 gap-y-6 md:grid-cols-3">
        <Input label="Трек номер:" {...register('trackNumber')} error={errors.trackNumber?.message} />
        <Input
          label="Сумма заказа, £:"
          inputMode="decimal"
          placeholder="Только цифры"
          {...register('amount')}
          error={errors.amount?.message}
        />
        <Input label="Магазин:" {...register('shop')} error={errors.shop?.message} />
      </div>

      <Alert variant="error">{serverError}</Alert>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-[165px]">
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  )
}
