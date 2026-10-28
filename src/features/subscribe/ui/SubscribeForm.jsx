import { useState } from 'react'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui'
import { subscribeSchema } from '../model/schema'

// Подписка на рассылку о скидках: email + кнопка. Настоящего бэкенда нет — показываем подтверждение
export function SubscribeForm() {
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(subscribeSchema), defaultValues: { email: '' } })

  const onSubmit = () => {
    setDone(true)
    reset()
  }

  if (done) {
    return <p className="text-lg font-bold">Спасибо! Мы будем присылать самые выгодные акции.</p>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:gap-8">
      <label className="block flex-1">
        <span className="flex h-11 items-center gap-4 border-b border-white/70 focus-within:border-white">
          <EnvelopeSimpleIcon size={22} className="shrink-0" />
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            placeholder="Введите ваш email"
            className="h-full w-full bg-transparent text-[15px] font-light text-white outline-none placeholder:text-white/80"
          />
        </span>
        {errors.email && <span className="mt-1 block text-xs text-white">{errors.email.message}</span>}
      </label>

      <Button type="submit" className="h-[66px] w-full px-12 text-[17px] sm:w-[240px]">
        Подписаться
      </Button>
    </form>
  )
}
