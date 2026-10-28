import { BarbellIcon, BuildingsIcon, CaretDownIcon, FileTextIcon, GlobeIcon, ListBulletsIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { COUNTRY_OPTIONS, EXTRA_SERVICE_OPTIONS } from '../model/constants'
import { deliveryCalculatorSchema } from '../model/schema'

// Калькулятор доставки: страна, город, индекс, вес, доп. услуги. onCalculate получает { weight, extra }
export function DeliveryCalculatorForm({ onCalculate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deliveryCalculatorSchema),
    defaultValues: { country: 'ru', city: 'Москва', index: '', weight: '0.5', services: '' },
  })

  const onSubmit = ({ weight, services }) => {
    const extra = EXTRA_SERVICE_OPTIONS.find((option) => option.value === services)?.price ?? 0
    onCalculate({ weight, extra })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-3xl bg-white p-5 shadow-card sm:p-[35px]">
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
        <Line label="Страна:" icon={<GlobeIcon size={22} />} caret error={errors.country?.message}>
          <select {...register('country')} className={controlClass('cursor-pointer appearance-none pr-6')}>
            {COUNTRY_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Line>

        <Line label="Город:" icon={<BuildingsIcon size={22} />} error={errors.city?.message}>
          <input {...register('city')} autoComplete="address-level2" placeholder="Москва" className={controlClass()} />
        </Line>

        <Line label="Индекс:" icon={<ListBulletsIcon size={22} />} error={errors.index?.message}>
          <input {...register('index')} inputMode="numeric" maxLength={6} placeholder="Введите индекс" className={controlClass()} />
        </Line>

        <Line label="Вес посылки:" icon={<BarbellIcon size={22} />} error={errors.weight?.message}>
          <input {...register('weight')} inputMode="decimal" placeholder="0,5" className={controlClass()} />
        </Line>

        <Line label="Дополнительные услуги:" icon={<FileTextIcon size={22} />} caret error={errors.services?.message}>
          <select {...register('services')} className={controlClass('cursor-pointer appearance-none pr-6')}>
            <option value="">Выберите услуги</option>
            {EXTRA_SERVICE_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Line>
      </div>

      <Button type="submit" className="mt-8 h-[66px] w-full px-14 text-[17px] sm:w-[240px]">
        Рассчитать
      </Button>
    </form>
  )
}

const controlClass = (extra) =>
  cn('h-full w-full bg-transparent text-[15px] font-light text-dark outline-none placeholder:text-muted', extra)

// Поле с подписью сверху, иконкой слева и линией снизу (стиль макета)
function Line({ label, icon, caret, error, children }) {
  return (
    <label className="block">
      <span className="text-xs font-bold">{label}</span>
      <span className="relative mt-2 flex h-11 items-center gap-3 border-b border-dark focus-within:border-primary">
        <span className="shrink-0 text-dark/70">{icon}</span>
        {children}
        {caret && <CaretDownIcon size={16} className="pointer-events-none absolute right-0 text-dark" />}
      </span>
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  )
}
