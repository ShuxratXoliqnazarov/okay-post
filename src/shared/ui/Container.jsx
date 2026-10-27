import { cn } from '@/shared/lib'

export function Container({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-[1338px] px-4 sm:px-6', className)}>{children}</div>
}
