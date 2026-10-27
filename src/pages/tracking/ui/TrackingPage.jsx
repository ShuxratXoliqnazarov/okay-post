import { ParcelCard, useParcelStore } from '@/entities/parcel'
import { TrackParcelForm } from '@/features/track-parcel'
import { Container } from '@/shared/ui'

export function TrackingPage() {
  const { parcel, isLoading, error } = useParcelStore()

  return (
    <Container className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold text-dark">Отследить посылку</h1>
      <TrackParcelForm />

      <div className="mt-8">
        {isLoading && <p className="text-gray-500">Загрузка...</p>}
        {error && <p className="text-danger">{error}</p>}
        {parcel && <ParcelCard parcel={parcel} />}
      </div>
    </Container>
  )
}
