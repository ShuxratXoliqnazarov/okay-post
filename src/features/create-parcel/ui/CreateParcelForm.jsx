import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { formatAddress, getRecipientShortName } from '@/entities/address'
import { ORDER_STATUS, useOrderStore } from '@/entities/order'
import { DELIVERY_METHODS, PARCEL_SERVICES, PARCEL_STATUS, useParcelStore } from '@/entities/parcel'
import { ROUTES } from '@/shared/config'
import { formatDate, formatWeight } from '@/shared/lib'
import { Alert, Button, Checkbox, Select } from '@/shared/ui'
import { createParcelSchema } from '../model/schema'

const Divider = () => <hr className="my-10 border-line" />

/*
  Экран 22 «Создание посылки».
  orders — заказы, пришедшие на склад (их можно упаковать), addresses — адресная книга.
  После отправки: посылка «Запрос отправлен», выбранные заказы — «Упакован в посылку».
*/
export function CreateParcelForm({ orders, addresses }) {
  const navigate = useNavigate()
  const addParcel = useParcelStore((state) => state.addParcel)
  const updateOrder = useOrderStore((state) => state.updateOrder)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createParcelSchema),
    defaultValues: { orderIds: [], addressId: '', deliveryMethod: DELIVERY_METHODS[0].value, services: [] },
  })

  const onSubmit = async ({ orderIds, addressId, deliveryMethod, services }) => {
    try {
      setServerError('')
      const selectedOrders = orders.filter((order) => orderIds.includes(String(order.id)))
      const address = addresses.find((item) => String(item.id) === addressId)

      await addParcel({
        orderIds: selectedOrders.map((order) => order.id),
        addressId: address?.id ?? null,
        recipientName: address ? getRecipientShortName(address) : '',
        deliveryMethod,
        services,
        trackNumber: '',
        actualWeight: selectedOrders.reduce((sum, order) => sum + order.weight, 0),
        dimensions: '',
        totalWeight: null,
        cost: null, // склад посчитает после упаковки
        status: PARCEL_STATUS.REQUESTED,
      })
      await Promise.all(selectedOrders.map((order) => updateOrder(order.id, { status: ORDER_STATUS.PACKED })))
      navigate(`${ROUTES.CABINET_ORDERS}#parcels`)
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="mb-4 text-lg font-bold">Заказы</h2>
      {orders.length === 0 ? (
        <p className="font-light">Нет ни одной записи по текущему состоянию</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Checkbox key={order.id} value={String(order.id)} {...register('orderIds')}>
              ID {order.id} — {order.shop}, {formatWeight(order.weight)}
              <span className="ml-2 text-xs text-muted">пришёл {formatDate(order.createdAt)}</span>
            </Checkbox>
          ))}
        </div>
      )}
      {errors.orderIds && <p className="mt-2 text-xs text-danger">{errors.orderIds.message}</p>}

      <Divider />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <Select
          label="Выберите получателя:"
          className="sm:w-[424px]"
          placeholder="Не выбрано (Заполню позже)"
          options={addresses.map((address) => ({ value: String(address.id), label: formatAddress(address) }))}
          {...register('addressId')}
        />
        <Button to={ROUTES.CABINET_ADDRESS_BOOK} className="sm:w-[188px]">
          Добавить новый адрес
        </Button>
      </div>

      <Divider />

      <Select
        label="Выберите тип:"
        className="sm:w-[424px]"
        options={DELIVERY_METHODS}
        {...register('deliveryMethod')}
        error={errors.deliveryMethod?.message}
      />

      <Divider />

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {PARCEL_SERVICES.map((service) => (
          <Checkbox key={service.value} value={service.value} {...register('services')}>
            {service.label}
          </Checkbox>
        ))}
      </div>

      <Alert variant="error" className="mt-6">
        {serverError}
      </Alert>

      <Button type="submit" disabled={isSubmitting || orders.length === 0} className="mt-10 w-full sm:w-[188px]">
        {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
      </Button>
    </form>
  )
}
