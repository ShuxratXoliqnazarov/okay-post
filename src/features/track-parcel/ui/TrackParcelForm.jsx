import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parcelApi, useParcelStore } from '@/entities/parcel'
import { Button, Input } from '@/shared/ui'
import { trackSchema } from '../model/schema'

export function TrackParcelForm() {
  const { setParcel, setLoading, setError } = useParcelStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(trackSchema),
    defaultValues: { trackNumber: '' },
  })

  const onSubmit = async ({ trackNumber }) => {
    setLoading(true)
    try {
      const parcel = await parcelApi.getByTrackNumber(trackNumber)
      setParcel(parcel)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <Input
          placeholder="Введите трек-номер"
          {...register('trackNumber')}
          error={errors.trackNumber?.message}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Отследить
      </Button>
    </form>
  )
}
