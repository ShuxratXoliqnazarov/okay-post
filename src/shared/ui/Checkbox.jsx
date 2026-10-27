import { CheckIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

// Работает с react-hook-form: <Checkbox {...register('agree')} error={errors.agree?.message}>Текст</Checkbox>
export function Checkbox({ error, className, children, ref, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-dark">
        <span className="relative flex size-6 shrink-0">
          <input ref={ref} type="checkbox" className="peer absolute inset-0 cursor-pointer opacity-0" {...props} />
          <span className="pointer-events-none flex size-6 items-center justify-center rounded border border-line bg-field text-white transition peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
            <CheckIcon size={14} weight="bold" />
          </span>
        </span>
        <span>{children}</span>
      </label>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  )
}
