import { cn } from '@/shared/lib'

// Работает с react-hook-form: <Input {...register('phone')} error={errors.phone?.message} />
export function Input({ label, error, className, ref, ...props }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-dark">{label}</span>}
      <input
        ref={ref}
        className={cn(
          'rounded-xl border px-4 py-3 outline-none transition-colors focus:border-primary',
          error ? 'border-danger' : 'border-gray-300',
          className,
        )}
        {...props}
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </label>
  )
}
