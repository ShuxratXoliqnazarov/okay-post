import { UserIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

// Фото пользователя или серая заглушка, если фото нет
export function Avatar({ src, alt = '', className }) {
  if (src) return <img src={src} alt={alt} className={cn('object-cover', className)} />

  return (
    <span className={cn('flex items-center justify-center bg-surface text-muted/60', className)}>
      <UserIcon className="size-1/2" />
    </span>
  )
}
