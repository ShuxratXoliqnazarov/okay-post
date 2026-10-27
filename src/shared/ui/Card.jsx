import { cn } from '@/shared/lib'

export function Card({ as: Component = 'div', className, children }) {
  return <Component className={cn('rounded-2xl bg-white shadow-card', className)}>{children}</Component>
}
