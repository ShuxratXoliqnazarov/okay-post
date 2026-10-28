import { cn } from '@/shared/lib'

// Широкая плашка с фирменным градиентом (индиго → голубой) и большими скруглениями — как в макете лендинга
export function GradientBanner({ className, children }) {
  return (
    <div
      className={cn(
        'relative mx-auto w-[calc(100%-32px)] max-w-[1800px] overflow-hidden rounded-[28px] sm:w-[calc(100%-80px)] lg:w-[calc(100%-120px)] lg:rounded-[40px]',
        'bg-linear-75 from-indigo to-accent text-white',
        className,
      )}
    >
      {children}
    </div>
  )
}
