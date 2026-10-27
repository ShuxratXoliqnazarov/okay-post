import { twMerge } from 'tailwind-merge'

// Склеивает классы, пропуская false/null/undefined, и убирает конфликты Tailwind:
// cn('px-5 h-9', isActive && 'bg-primary', 'px-0') -> 'h-9 bg-primary px-0'
// Поэтому className, переданный в компонент, всегда перебивает его стили по умолчанию.
export const cn = (...classes) => twMerge(classes.filter(Boolean).join(' '))
