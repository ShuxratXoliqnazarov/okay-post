import { getFullName, selectUser, useUserStore } from '@/entities/user'
import { ChangePasswordForm } from '@/features/change-password'
import { Avatar, Card } from '@/shared/ui'

// макет: 11_ЛК_Профиль_Изменить пароль
export function ChangePasswordPage() {
  const user = useUserStore(selectUser)

  return (
    <Card className="grid gap-10 p-5 pb-16 md:grid-cols-[248px_1fr] md:gap-14">
      <h1 className="sr-only">Изменить пароль</h1>
      <Avatar src={user.avatar} alt={getFullName(user)} className="mx-auto size-[248px] max-w-full rounded-lg md:mx-0" />
      <div className="md:pt-3">
        <ChangePasswordForm />
      </div>
    </Card>
  )
}
