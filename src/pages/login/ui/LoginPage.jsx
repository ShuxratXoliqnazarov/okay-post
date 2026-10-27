import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/login'
import { ROUTES } from '@/shared/config'

export function LoginPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-dark">Вход</h1>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Нет аккаунта?{' '}
        <Link to={ROUTES.REGISTER} className="text-primary">
          Зарегистрироваться
        </Link>
      </p>
    </>
  )
}
