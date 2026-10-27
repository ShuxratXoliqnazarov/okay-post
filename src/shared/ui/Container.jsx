import { cn } from '@/shared/lib'

export function Container({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4', className)}>{children}</div>
}
