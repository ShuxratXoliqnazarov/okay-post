import { useState } from 'react'
import { LinkSimpleIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui'
import { orderByLinkSchema } from '../model/schema'

// «Покупка с оператором»: пользователь присылает ссылку на товар
export function OrderByLinkForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(orderByLinkSchema), defaultValues: { link: '' } })

  const onSubmit = () => {
    setSent(true)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 max-w-[640px] sm:mt-8">
      <label className="block max-w-[513px]">
        <span className="flex h-11 items-center gap-3 border-b border-white/80 focus-within:border-white">
          <LinkSimpleIcon size={22} className="shrink-0" />
          <input
            {...register('link')}
            type="url"
            placeholder="Введите ссылку на товар"
            className="h-full w-full bg-transparent text-sm font-light text-white outline-none placeholder:text-white/80"
          />
        </span>
        {errors.link && <span className="mt-1 block text-xs text-white">{errors.link.message}</span>}
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-12">
        <Button type="submit" className="h-[66px] w-full px-12 text-[17px] sm:w-[240px]">
          Отправить
        </Button>
        <p className="max-w-[420px] text-xs leading-6 font-light text-white/90">
          {sent
            ? 'Ссылка отправлена! Оператор свяжется с вами в ближайшее время.'
            : 'Нажимая на кнопку вы подтверждаете согласие с правилами предоставления услуги и политикой конфиденциальности'}
        </p>
      </div>
    </form>
  )
}
