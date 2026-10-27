import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/login'
import { ROUTES } from '@/shared/config'

// макет: 09_Вход_Забыли пароль
export function LoginPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-dark">Выполните вход в ваш личный кабинет</h1>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Нет аккаунта?{' '}
        <Link to={ROUTES.REGISTER} className="text-primary hover:underline">
          Зарегистрироваться
        </Link>
      </p>

      {/* TODO: убрать перед сдачей */}
      <p className="mt-6 rounded-xl bg-gray-100 p-3 text-xs text-gray-500">
        Тестовый вход: test@okeypost.com / test1234
      </p>
    </>
  )
}
