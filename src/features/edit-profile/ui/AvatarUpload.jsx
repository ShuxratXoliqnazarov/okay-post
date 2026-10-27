import { useRef } from 'react'
import { readFileAsDataUrl } from '@/shared/lib'
import { Avatar, Button } from '@/shared/ui'
import { validateAvatar } from '../model/schema'

export function AvatarUpload({ value, onChange, error, onError }) {
  const inputRef = useRef(null)

  const handleChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const validationError = validateAvatar(file)
    if (validationError) return onError(validationError)

    onError('')
    onChange(await readFileAsDataUrl(file))
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Avatar src={value} alt="Фото профиля" className="size-[248px] max-w-full rounded-lg" />
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
      <Button size="sm" className="h-9 w-[122px]" onClick={() => inputRef.current?.click()}>
        Выбрать файл
      </Button>
      {error && <span className="text-center text-xs text-danger">{error}</span>}
    </div>
  )
}
