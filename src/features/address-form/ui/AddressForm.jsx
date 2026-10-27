import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddressStore } from '@/entities/address'
import { Alert, Button, Input } from '@/shared/ui'
import { ADDRESS_FIELDS, addressSchema, EMPTY_ADDRESS } from '../model/schema'

export function AddressForm({ address, onSaved }) {
  const { addAddress, updateAddress } = useAddressStore()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: 'onTouched',
    defaultValues: address ?? EMPTY_ADDRESS,
  })

  const onSubmit = async (data) => {
    try {
      setServerError('')
      const saved = address ? await updateAddress(address.id, data) : await addAddress(data)
      if (!address) reset(EMPTY_ADDRESS)
      onSaved?.(saved)
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-[1056px] flex-col gap-6">
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {ADDRESS_FIELDS.map(({ name, label, ...inputProps }) => (
          <Input key={name} label={label} required {...inputProps} {...register(name)} error={errors[name]?.message} />
        ))}
      </div>

      <Alert variant="error">{serverError}</Alert>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-[165px]">
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  )
}
