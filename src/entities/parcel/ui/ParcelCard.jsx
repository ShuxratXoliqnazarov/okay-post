import { PARCEL_STATUS_LABEL } from '../model/constants'

export function ParcelCard({ parcel }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <p className="text-sm text-gray-500">Трек-номер</p>
      <p className="text-lg font-semibold text-dark">{parcel.trackNumber}</p>
      <p className="mt-3 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
        {PARCEL_STATUS_LABEL[parcel.status] ?? parcel.status}
      </p>
    </div>
  )
}
