import { TrackParcelForm } from '@/features/track-parcel'
import { Container } from '@/shared/ui'

export function HomePage() {
  return (
    <Container>
      <section className="rounded-3xl bg-primary/5 p-10">
        <h1 className="text-4xl font-bold text-dark">Доставка посылок по всему Узбекистану</h1>
        <p className="mt-3 text-gray-600">Отследите свою посылку по трек-номеру</p>
        <div className="mt-6 max-w-xl">
          <TrackParcelForm />
        </div>
      </section>
    </Container>
  )
}
