import { CaretDownIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'
import { Field } from './Field'
import { fieldClasses } from './fieldClasses'

export function Select({ label, required, error, options, placeholder, className, ref, ...props }) {
  return (
    <Field label={label} required={required} error={error} className={className}>
      <span className="relative block">
        <select
          ref={ref}
          className={cn(fieldClasses(error), 'h-[45px] cursor-pointer appearance-none pr-11')}
          {...props}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map(({ value, label: optionLabel }) => (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          ))}
        </select>
        <CaretDownIcon
          size={18}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-primary"
        />
      </span>
    </Field>
  )
}
