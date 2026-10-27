import { cn } from '@/shared/lib'

export function Radio({ className, children, ref, ...props }) {
  return (
    <label className={cn('flex cursor-pointer items-start gap-3 text-sm text-dark', className)}>
      <span className="relative flex size-6 shrink-0">
        <input ref={ref} type="radio" className="peer absolute inset-0 cursor-pointer opacity-0" {...props} />
        <span className="pointer-events-none size-6 rounded-full border border-line bg-white transition peer-checked:border-primary peer-checked:border-[7px] peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30" />
      </span>
      {children && <span className="flex-1">{children}</span>}
    </label>
  )
}
