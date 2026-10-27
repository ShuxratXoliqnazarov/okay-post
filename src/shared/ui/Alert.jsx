import { cn } from '@/shared/lib'

const variants = {
  error: 'bg-danger/10 text-danger',
  success: 'bg-primary/10 text-primary-dark',
  info: 'bg-surface text-dark',
}

export function Alert({ variant = 'info', className, children }) {
  if (!children) return null
  return <div className={cn('rounded-xl px-4 py-3 text-sm', variants[variant], className)}>{children}</div>
}
