import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useUserStore, userApi } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { Button, Input } from '@/shared/ui'
import { registerSchema } from '../model/schema'

export function RegisterForm() {
  const navigate = useNavigate()
  const setAuth = useUserStore((state) => state.setAuth)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', phone: '+998', password: '', confirmPassword: '' },
  })

  const onSubmit = async ({ name, phone, password }) => {
    try {
      setServerError('')
      const response = await userApi.register({ name, phone, password })
      setAuth(response)
      navigate(ROUTES.PROFILE)
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Имя" {...register('name')} error={errors.name?.message} />
      <Input label="Телефон" {...register('phone')} error={errors.phone?.message} />
      <Input
        label="Пароль"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        label="Повторите пароль"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      {serverError && <p className="text-sm text-danger">{serverError}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  )
}
