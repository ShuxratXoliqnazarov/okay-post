import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TRANSACTION_TYPE_LABEL } from '@/entities/transaction'
import { Button, Field, fieldClasses, Select } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { DEFAULT_TRANSACTIONS_FILTER, transactionsFilterSchema } from '../model/filter'

const TYPE_OPTIONS = Object.entries(TRANSACTION_TYPE_LABEL).map(([value, label]) => ({ value, label }))

// Строка фильтра транзакций: «От и до», «Все транзакции», «Показать» (экран 17)
export function TransactionsFilter({ onApply }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionsFilterSchema),
    defaultValues: DEFAULT_TRANSACTIONS_FILTER,
  })

  return (
    <form onSubmit={handleSubmit(onApply)} noValidate className="flex flex-wrap items-start gap-3">
      <Field error={errors.to?.message} className="w-full sm:w-[270px]">
        <span className={cn(fieldClasses(errors.to), 'flex h-[45px] items-center gap-2')}>
          <input type="date" aria-label="От" className="min-w-0 flex-1 bg-transparent outline-none" {...register('from')} />
          <span className="text-muted">—</span>
          <input type="date" aria-label="До" className="min-w-0 flex-1 bg-transparent outline-none" {...register('to')} />
        </span>
      </Field>

      <Select options={TYPE_OPTIONS} placeholder="Все транзакции" className="w-full sm:w-[270px]" {...register('type')} />

      <Button type="submit" className="w-full sm:w-[135px]">
        Показать
      </Button>
    </form>
  )
}
