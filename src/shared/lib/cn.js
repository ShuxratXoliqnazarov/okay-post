// Склеивает классы, пропуская false/null/undefined:
// cn('px-4', isActive && 'bg-primary') -> 'px-4 bg-primary'
export const cn = (...classes) => classes.filter(Boolean).join(' ')
