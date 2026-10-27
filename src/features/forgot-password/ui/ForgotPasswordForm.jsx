import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userApi } from '@/entities/user'
import { Alert, Button, Input } from '@/shared/ui'
import { forgotPasswordSchema } from '../model/schema'

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  const onSubmit = async (data) => {
    try {
      setServerError('')
      const { message } = await userApi.forgotPassword(data)
      setSuccessMessage(message)
    } catch (error) {
      setServerError(error.message)
    }
  }

  if (successMessage) return <Alert variant="success">{successMessage}</Alert>

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        Введите Email, с которым вы зарегистрированы на сайте, и нажмите «Восстановить»
      </p>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Alert variant="error">{serverError}</Alert>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Восстановить'}
      </Button>
    </form>
  )
}
