import { Link } from 'react-router-dom'
import { RegisterForm } from '@/features/register'
import { ROUTES } from '@/shared/config'

// макет: 09_Вход_Забыли пароль
export function RegisterPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-dark">
        Начните совершать покупки в английских магазинах
      </h1>
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Уже зарегистрированы?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
          Выполните вход
        </Link>
      </p>
    </>
  )
}
