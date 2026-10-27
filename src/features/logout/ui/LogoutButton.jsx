import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'

export function LogoutButton() {
  const navigate = useNavigate()
  const logout = useUserStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Выйти
    </Button>
  )
}
