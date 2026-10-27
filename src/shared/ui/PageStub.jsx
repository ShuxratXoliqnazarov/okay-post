import { Container } from './Container'

// Временная заглушка страницы. Удали её из страницы, когда начнёшь верстать по Figma.
export function PageStub({ title, figma }) {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold text-dark">{title}</h1>
      <p className="mt-2 text-gray-500">Figma: {figma}</p>
    </Container>
  )
}
