import { cn } from '@/shared/lib'

// Заголовок страницы/раздела ЛК («Заказы пользователя Dmitro Karimov»)
export function PageTitle({ as: Component = 'h1', className, children }) {
  return <Component className={cn('text-xl font-bold text-dark sm:text-[26px]', className)}>{children}</Component>
}
