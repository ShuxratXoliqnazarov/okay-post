import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { selectUser, userApi, useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { Alert, Button, Card, Checkbox, Input } from '@/shared/ui'
import { editProfileSchema } from '../model/schema'
import { AvatarUpload } from './AvatarUpload'

// Экран 10: фото слева, форма в 2 колонки справа
export function EditProfileForm() {
  const navigate = useNavigate()
  const user = useUserStore(selectUser)
  const setUser = useUserStore((state) => state.setUser)
  const [avatar, setAvatar] = useState(user.avatar)
  const [avatarError, setAvatarError] = useState('')
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      login: user.login,
      phone: user.phone,
      email: user.email,
      subscribed: user.subscribed,
    },
  })

  const onSubmit = async (data) => {
    try {
      setServerError('')
      const updatedUser = await userApi.updateProfile({ ...data, avatar })
      setUser(updatedUser)
      navigate(ROUTES.CABINET_PROFILE)
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <Card className="grid gap-10 p-5 md:grid-cols-[248px_1fr] md:gap-14">
      <AvatarUpload value={avatar} onChange={setAvatar} error={avatarError} onError={setAvatarError} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-[690px] flex-col gap-6 pb-10 md:pt-3">
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
          <Input label="Имя:" autoComplete="given-name" {...register('firstName')} error={errors.firstName?.message} />
          <Input label="Фамилия:" autoComplete="family-name" {...register('lastName')} error={errors.lastName?.message} />
          <Input label="Адрес:" autoComplete="street-address" {...register('address')} error={errors.address?.message} />
          <Input label="Логин:" autoComplete="username" {...register('login')} error={errors.login?.message} />
          <Input
            label="Номер телефона:"
            type="tel"
            autoComplete="tel"
            placeholder="+992 XX XXX XX XX"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input label="E-mail:" type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
        </div>

        <Checkbox {...register('subscribed')}>Подписаться на рассылку</Checkbox>
        <Alert variant="error">{serverError}</Alert>

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-[150px]">
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </form>
    </Card>
  )
}
