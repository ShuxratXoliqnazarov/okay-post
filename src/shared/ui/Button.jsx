import { cn } from '@/shared/lib'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-dark hover:bg-gray-100',
}

export function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button
      className={cn(
        'rounded-xl px-5 py-3 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
