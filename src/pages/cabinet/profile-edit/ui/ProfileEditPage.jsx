import { EditProfileForm } from '@/features/edit-profile'

// макет: 10_ЛК_Профиль_Редактирование
export function ProfileEditPage() {
  return (
    <>
      <h1 className="sr-only">Редактирование профиля</h1>
      <EditProfileForm />
    </>
  )
}
