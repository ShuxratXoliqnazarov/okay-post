import { cn } from '@/shared/lib'

export function Field({ label, required, error, className, children }) {
  return (
    <label className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span className="text-[15px] font-bold text-dark">
          {label}
          {required && <span className="text-danger">*</span>}
        </span>
      )}
      {children}
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  )
}
