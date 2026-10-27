import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userApi } from '@/entities/user'
import { Alert, Button, Input } from '@/shared/ui'
import { changePasswordSchema } from '../model/schema'

export function ChangePasswordForm() {
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  })

  const onSubmit = async ({ oldPassword, newPassword }) => {
    try {
      setServerError('')
      const { message } = await userApi.changePassword({ oldPassword, newPassword })
      setSuccessMessage(message)
      reset()
    } catch (error) {
      setSuccessMessage('')
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full max-w-[336px] flex-col gap-6">
      <Input
        label="Старый пароль:"
        type="password"
        autoComplete="current-password"
        {...register('oldPassword')}
        error={errors.oldPassword?.message}
      />
      <Input
        label="Новый пароль:"
        type="password"
        autoComplete="new-password"
        {...register('newPassword')}
        error={errors.newPassword?.message}
      />
      <Input
        label="Новый пароль еще раз:"
        type="password"
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <Alert variant="error">{serverError}</Alert>
      <Alert variant="success">{successMessage}</Alert>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-[150px]">
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  )
}
