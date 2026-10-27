import { cn } from '@/shared/lib'

// Общий стиль полей ввода из макета (Input, Textarea, Select)
export const fieldClasses = (error) =>
  cn(
    'w-full rounded-md border bg-field px-4 text-sm text-dark outline-none transition-colors',
    'placeholder:text-muted/70 focus:border-primary disabled:opacity-60',
    error ? 'border-danger' : 'border-line',
  )
