import { Link } from 'react-router-dom'
import { ForgotPasswordForm } from '@/features/forgot-password'
import { ROUTES } from '@/shared/config'

// Figma: 09_Вход_Забыли пароль (попап «Восстановление пароля»)
export function ForgotPasswordPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-dark">Восстановление пароля</h1>
      <ForgotPasswordForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Вспомнили пароль?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
          Выполните вход
        </Link>
      </p>
    </>
  )
}
