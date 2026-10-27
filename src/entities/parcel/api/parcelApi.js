import { request } from '@/shared/api'

export const parcelApi = {
  getByTrackNumber: (trackNumber) => request(`/parcels/${trackNumber}`),
}
