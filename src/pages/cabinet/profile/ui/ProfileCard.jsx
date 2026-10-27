import { getFullName } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { Avatar, Button, Card } from '@/shared/ui'

export function ProfileCard({ user }) {
  const rows = [
    { label: 'Имя:', value: getFullName(user) },
    { label: 'Логин:', value: user.login },
    { label: 'E-mail:', value: <a href={`mailto:${user.email}`} className="hover:text-primary">{user.email}</a> },
    { label: 'Телефон:', value: <a href={`tel:${user.phone}`} className="hover:text-primary">{user.phone}</a> },
    { label: 'Адрес:', value: [user.city, user.address].filter(Boolean).join('. ') },
  ]

  return (
    <Card className="grid gap-8 p-5 md:grid-cols-[248px_1fr] md:gap-12">
      <Avatar src={user.avatar} alt={getFullName(user)} className="mx-auto size-[248px] max-w-full rounded-lg md:mx-0" />

      <div className="flex flex-col justify-center gap-6 md:py-5">
        <dl className="grid grid-cols-[90px_1fr] gap-x-2 gap-y-4 text-[13px]">
          {rows.map(({ label, value }) => (
            <div key={label} className="contents">
              <dt className="font-bold">{label}</dt>
              <dd className="font-light break-all">{value || '—'}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-6">
          <Button size="sm" to={ROUTES.CABINET_PROFILE_EDIT} className="w-[122px] px-0">
            Редактировать
          </Button>
          <Button variant="link" to={ROUTES.CABINET_CHANGE_PASSWORD} className="text-xs font-semibold">
            Изменить пароль
          </Button>
        </div>
      </div>
    </Card>
  )
}
