import { selectUser, useUserStore } from '@/entities/user'
import { Container } from '@/shared/ui'

export function ProfilePage() {
  const user = useUserStore(selectUser)

  return (
    <Container>
      <h1 className="text-3xl font-bold text-dark">Профиль</h1>
      <p className="mt-4 text-gray-600">{user?.name}</p>
      <p className="text-gray-600">{user?.phone}</p>
    </Container>
  )
}
