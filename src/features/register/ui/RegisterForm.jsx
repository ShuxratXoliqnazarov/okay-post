import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useUserStore, userApi } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { Alert, Button, Checkbox, Input } from '@/shared/ui'
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
    mode: 'onTouched',
    defaultValues: {
      name: '',
      phone: '+992',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
  })

  const onSubmit = async ({ name, phone, email, password }) => {
    try {
      setServerError('')
      const response = await userApi.register({ name, phone, email, password })
      setAuth(response)
      navigate(ROUTES.CABINET_PROFILE, { replace: true })
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input label="Имя" autoComplete="given-name" {...register('name')} error={errors.name?.message} />
      <Input
        label="Телефон"
        type="tel"
        autoComplete="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />
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
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        label="Повторите пароль"
        type="password"
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <Checkbox {...register('agree')} error={errors.agree?.message}>
        Нажимая на кнопку, вы соглашаетесь с{' '}
        <a href="#" className="text-primary hover:underline">
          правилами предоставления услуг
        </a>{' '}
        и политикой конфиденциальности
      </Checkbox>

      <Alert variant="error">{serverError}</Alert>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  )
}
