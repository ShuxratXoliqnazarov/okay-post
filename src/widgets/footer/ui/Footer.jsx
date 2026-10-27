import { Container } from '@/shared/ui'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mt-auto bg-dark py-8 text-white">
      <Container>
        <p className="text-sm text-gray-400">© {CURRENT_YEAR} Okey Post</p>
      </Container>
    </footer>
  )
}
