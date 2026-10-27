import { cn } from '@/shared/lib'
import { Field } from './Field'
import { fieldClasses } from './fieldClasses'

export function Textarea({ label, required, error, className, ref, rows = 4, ...props }) {
  return (
    <Field label={label} required={required} error={error} className={className}>
      <textarea ref={ref} rows={rows} className={cn(fieldClasses(error), 'resize-y py-3')} {...props} />
    </Field>
  )
}
