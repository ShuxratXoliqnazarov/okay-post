import { cn } from '@/shared/lib'

// Белая карточка с мягкой тенью (профиль, уведомления)
export function Card({ as: Component = 'div', className, children }) {
  return <Component className={cn('rounded-2xl bg-white shadow-card', className)}>{children}</Component>
}
