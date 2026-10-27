import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { Container } from '@/shared/ui'

export function NotFoundPage() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-gray-600">Страница не найдена</p>
      <Link to={ROUTES.HOME} className="mt-6 inline-block text-primary underline">
        На главную
      </Link>
    </Container>
  )
}
