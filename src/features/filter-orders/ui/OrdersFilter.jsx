import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Radio, Select } from '@/shared/ui'
import { DEFAULT_ORDERS_FILTER, ordersFilterSchema, PERIOD_OPTIONS } from '../model/filter'

/*
  Раскрывающаяся строка фильтра заказов (экран 18_фильтр).
  onApply(filter) — «Показать», onReset() — «Сбросить». Фильтрует filterOrders(orders, filter).
*/
export function OrdersFilter({ onApply, onReset }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ordersFilterSchema),
    defaultValues: DEFAULT_ORDERS_FILTER,
  })

  const mode = useWatch({ control, name: 'mode' })

  const handleReset = () => {
    reset(DEFAULT_ORDERS_FILTER)
    onReset()
  }

  return (
    <form
      onSubmit={handleSubmit(onApply)}
      noValidate
      className="flex flex-wrap items-start gap-x-6 gap-y-4 py-6"
      // Клик по полю сразу выбирает его режим
      onFocus={(event) => {
        const fieldMode = event.target.dataset.mode
        if (fieldMode && fieldMode !== mode) setValue('mode', fieldMode)
      }}
    >
      <div className="flex items-center gap-3">
        <Radio value="period" aria-label="За период" {...register('mode')} />
        <Select options={PERIOD_OPTIONS} className="w-60" data-mode="period" {...register('period')} />
      </div>

      <div className="flex items-start gap-3">
        <span className="pt-2.5">
          <Radio value="range" aria-label="Свои даты" {...register('mode')} />
        </span>
        <Input type="date" aria-label="С даты" className="w-[150px]" data-mode="range" {...register('from')} error={errors.from?.message} />
        <span className="pt-3 text-muted">-</span>
        <Input type="date" aria-label="По дату" className="w-[150px]" data-mode="range" {...register('to')} error={errors.to?.message} />
      </div>

      <div className="flex h-[45px] items-center">
        <Radio value="all" {...register('mode')}>
          Без учета даты
        </Radio>
      </div>

      <Input placeholder="ID заказа" inputMode="numeric" className="w-[135px]" {...register('orderId')} error={errors.orderId?.message} />

      <div className="flex items-center gap-6">
        <Button type="submit" className="w-[135px]">
          Показать
        </Button>
        <Button variant="link" className="text-xs font-bold no-underline" onClick={handleReset}>
          Сбросить
        </Button>
      </div>
    </form>
  )
}
