import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useUserStore, userApi } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { Button, Input } from '@/shared/ui'
import { loginSchema } from '../model/schema'

export function LoginForm() {
  const navigate = useNavigate()
  const setAuth = useUserStore((state) => state.setAuth)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '+998', password: '' },
  })

  const onSubmit = async (data) => {
    try {
      setServerError('')
      const response = await userApi.login(data)
      setAuth(response)
      navigate(ROUTES.PROFILE)
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Телефон" {...register('phone')} error={errors.phone?.message} />
      <Input
        label="Пароль"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      {serverError && <p className="text-sm text-danger">{serverError}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  )
}
