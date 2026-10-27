import { twMerge } from 'tailwind-merge'

// склеивает классы, twMerge убирает конфликты (px-5 + px-0 = px-0)
export const cn = (...classes) => twMerge(classes.filter(Boolean).join(' '))
