import { cn } from '@/shared/lib'

// Зелёный кружок-счётчик (непрочитанные уведомления). 0 — не показывается.
export function Badge({ count, className }) {
  if (!count) return null
  return (
    <span
      className={cn(
        'flex size-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white',
        className,
      )}
    >
      {count > 9 ? '9+' : count}
    </span>
  )
}
