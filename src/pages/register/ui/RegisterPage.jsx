import { Link } from 'react-router-dom'
import { RegisterForm } from '@/features/register'
import { ROUTES } from '@/shared/config'

export function RegisterPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-dark">Регистрация</h1>
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Уже есть аккаунт?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary">
          Войти
        </Link>
      </p>
    </>
  )
}
