import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUserStore, userApi } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { Alert, Button, Input } from '@/shared/ui'
import { loginSchema } from '../model/schema'

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useUserStore((state) => state.setAuth)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    try {
      setServerError('')
      const response = await userApi.login(data)
      setAuth(response)
      // Вернуть туда, откуда отправил ProtectedRoute, иначе — в профиль
      navigate(location.state?.from?.pathname ?? ROUTES.CABINET_PROFILE, { replace: true })
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Пароль"
        type="password"
        autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Link to={ROUTES.FORGOT_PASSWORD} className="self-end text-sm text-primary hover:underline">
        Забыли пароль?
      </Link>

      <Alert variant="error">{serverError}</Alert>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  )
}
