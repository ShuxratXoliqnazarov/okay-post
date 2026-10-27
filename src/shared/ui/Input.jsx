import { cn } from '@/shared/lib'
import { Field } from './Field'
import { fieldClasses } from './fieldClasses'

// Работает с react-hook-form: <Input label="Имя:" {...register('name')} error={errors.name?.message} />
export function Input({ label, required, error, icon, className, ref, ...props }) {
  return (
    <Field label={label} required={required} error={error} className={className}>
      <span className="relative block">
        <input ref={ref} className={cn(fieldClasses(error), 'h-[45px]', icon && 'pr-11')} {...props} />
        {icon && (
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-primary">
            {icon}
          </span>
        )}
      </span>
    </Field>
  )
}
