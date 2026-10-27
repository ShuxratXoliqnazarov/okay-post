import { useEffect, useState } from 'react'
import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import { formatAddress, useAddressStore } from '@/entities/address'
import { getFullName, selectUser, useUserStore } from '@/entities/user'
import { AddressForm } from '@/features/address-form'
import { cn } from '@/shared/lib'
import { Alert, Button, PageTitle } from '@/shared/ui'

// Figma: 24_Адресная книга. Сверху — сохранённые адреса, ниже — форма нового/редактируемого адреса.
export function AddressBookPage() {
  const user = useUserStore(selectUser)
  const { addresses, isLoading, fetchAddresses, removeAddress } = useAddressStore()
  const [editingId, setEditingId] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const editingAddress = addresses.find((address) => address.id === editingId)

  const handleSaved = () => {
    setSuccessMessage(editingAddress ? 'Адрес обновлён' : 'Адрес добавлен')
    setEditingId(null)
  }

  const handleRemove = async (id) => {
    if (!window.confirm('Удалить этот адрес?')) return
    await removeAddress(id)
    if (editingId === id) setEditingId(null)
  }

  return (
    <>
      <PageTitle className="mb-8">Адресная книга пользователя {getFullName(user)}</PageTitle>

      {isLoading && <p className="mb-6 text-muted">Загрузка...</p>}
      {addresses.length > 0 && (
        <ul className="mb-10 grid gap-3 lg:grid-cols-2">
          {addresses.map((address) => (
            <li
              key={address.id}
              className={cn(
                'flex items-start justify-between gap-4 rounded-md bg-surface px-5 py-4 text-sm',
                address.id === editingId && 'ring-2 ring-primary',
              )}
            >
              <span>
                <span className="block font-bold">{formatAddress(address)}</span>
                <span className="font-light">
                  {address.zip}, {address.country} · {address.phone}
                </span>
              </span>
              <span className="flex shrink-0 gap-3">
                <button type="button" aria-label="Редактировать" onClick={() => setEditingId(address.id)} className="hover:text-primary">
                  <PencilSimpleIcon size={18} />
                </button>
                <button type="button" aria-label="Удалить" onClick={() => handleRemove(address.id)} className="hover:text-danger">
                  <TrashIcon size={18} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <Alert variant="success" className="mb-6 max-w-[1056px]">
        {successMessage}
      </Alert>

      <AddressForm key={editingId ?? 'new'} address={editingAddress} onSaved={handleSaved} />

      <Button
        variant="link"
        className="mt-10 text-[15px] font-bold no-underline"
        onClick={() => {
          setEditingId(null)
          setSuccessMessage('')
        }}
      >
        + Добавить еще адрес
      </Button>
    </>
  )
}
