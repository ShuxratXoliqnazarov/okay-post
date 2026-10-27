import { cn } from '@/shared/lib'

// Круглая кнопка с иконкой (фильтр). active — залитая зелёным.
export function IconButton({ active, label, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'flex size-[45px] shrink-0 items-center justify-center rounded-full border border-primary transition',
        active ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary/10',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
