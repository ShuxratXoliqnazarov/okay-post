import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { XIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { ORDER_STATUS, ORDER_TYPE, useOrderStore } from '@/entities/order'
import { ROUTES } from '@/shared/config'
import { formatMoney } from '@/shared/lib'
import { Alert, Button, Input, Modal, Textarea } from '@/shared/ui'
import { checkoutSchema, EMPTY_ITEM, getShopFromLink, itemsToFormValues } from '../model/schema'

/*
  Экран 20 «Оформление заказа» — оператор выкупит товары за клиента.
  Отправить  → окно со списком товаров и суммой → «Подтвердить» → заказ ждёт оплаты
  Сохранить  → черновик, к нему можно вернуться из таблицы заказов
  Дублировать → копия последнего товара, Добавить товар → пустой товар
  order — черновик для редактирования (если открыли «Продолжить»)
*/
export function CheckoutOrderForm({ order }) {
  const navigate = useNavigate()
  const { addOrder, updateOrder } = useOrderStore()
  const [confirmItems, setConfirmItems] = useState(null)
  const [serverError, setServerError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
    defaultValues: { items: order ? itemsToFormValues(order.items) : [EMPTY_ITEM] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const saveOrder = async (items, status) => {
    try {
      setServerError('')
      const payload = {
        type: ORDER_TYPE.PURCHASE,
        status,
        items,
        shop: getShopFromLink(items[0].link),
        trackNumber: '',
        weight: 0,
        amount: 0,
        comment: '',
      }
      if (order) await updateOrder(order.id, payload)
      else await addOrder(payload)
      navigate(ROUTES.CABINET_ORDERS)
    } catch (error) {
      setServerError(error.message)
    }
  }

  const duplicateLastItem = () => {
    const items = getValues('items')
    append({ ...items[items.length - 1] })
  }

  const total = confirmItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0

  return (
    <>
      <form
        onSubmit={handleSubmit(({ items }) => setConfirmItems(items))}
        noValidate
        className="flex max-w-[634px] flex-col gap-10"
      >
        {fields.map((field, index) => {
          const itemErrors = errors.items?.[index]
          return (
            <fieldset key={field.id} className="flex flex-col gap-6">
              <legend className="mb-6 flex w-full items-center justify-between text-lg font-bold">
                Товар # {index + 1}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label={`Удалить товар ${index + 1}`}
                    className="text-muted hover:text-danger"
                  >
                    <XIcon size={20} />
                  </button>
                )}
              </legend>

              <Input
                label="Ссылка на страницу с товаром:"
                type="url"
                placeholder="https://"
                {...register(`items.${index}.link`)}
                error={itemErrors?.link?.message}
              />
              <Input label="Название товара:" {...register(`items.${index}.name`)} error={itemErrors?.name?.message} />
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                <Input
                  label="Количество:"
                  inputMode="numeric"
                  {...register(`items.${index}.quantity`)}
                  error={itemErrors?.quantity?.message}
                />
                <Input label="Размер:" {...register(`items.${index}.size`)} error={itemErrors?.size?.message} />
                <Input label="Цвет:" {...register(`items.${index}.color`)} error={itemErrors?.color?.message} />
                <Input
                  label="Цена на сайте, £:"
                  inputMode="decimal"
                  placeholder="Только цифры"
                  {...register(`items.${index}.price`)}
                  error={itemErrors?.price?.message}
                />
              </div>
              <Textarea label="Комментарий:" {...register(`items.${index}.comment`)} error={itemErrors?.comment?.message} />
            </fieldset>
          )
        })}

        <Alert variant="error">{serverError}</Alert>

        <div className="-mt-4 flex flex-wrap gap-2">
          <Button type="submit" className="w-[150px]">
            Отправить
          </Button>
          <Button variant="outline" className="px-8" onClick={duplicateLastItem}>
            Дублировать
          </Button>
          <Button variant="outline" className="w-[150px]" onClick={() => append(EMPTY_ITEM)}>
            Добавить товар
          </Button>
          <Button
            variant="outline"
            className="w-[150px]"
            disabled={isSubmitting}
            onClick={handleSubmit(({ items }) => saveOrder(items, ORDER_STATUS.DRAFT))}
          >
            Сохранить
          </Button>
        </div>
      </form>

      <Modal
        isOpen={Boolean(confirmItems)}
        onClose={() => setConfirmItems(null)}
        title="Проверьте заказ"
        className="max-w-[480px]"
      >
        <ul className="flex flex-col divide-y divide-line text-sm">
          {confirmItems?.map((item, index) => (
            <li key={index} className="flex justify-between gap-4 py-3">
              <span>
                {item.name} × {item.quantity}
                {(item.size || item.color) && (
                  <span className="block text-xs text-muted">{[item.size, item.color].filter(Boolean).join(', ')}</span>
                )}
              </span>
              <span className="font-bold whitespace-nowrap">{formatMoney(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-dark pt-4 font-bold">
          Итого: <span className="text-primary">{formatMoney(total)}</span>
        </p>
        <Button
          className="mt-6 w-full"
          disabled={isSubmitting}
          onClick={() => saveOrder(confirmItems, ORDER_STATUS.AWAITING_PAYMENT)}
        >
          Подтвердить
        </Button>
      </Modal>
    </>
  )
}
