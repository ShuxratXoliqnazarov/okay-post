import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib'

const variants = {
  primary: 'bg-linear-to-r from-primary to-primary-light text-white shadow-button hover:brightness-105',
  outline: 'border border-primary bg-white text-primary hover:bg-primary hover:text-white',
  ghost: 'text-dark hover:bg-surface',
  // Зелёная ссылка с пунктирным подчёркиванием («Изменить пароль»)
  link: 'text-primary underline decoration-dashed underline-offset-4 hover:text-primary-dark',
}

const sizes = {
  sm: 'h-9 px-5 text-xs',
  md: 'h-12 px-8 text-sm',
}

/*
  Кнопка-pill из макета.
    <Button>Сохранить</Button>
    <Button variant="outline" size="sm">Оплатить</Button>
    <Button to={ROUTES.CABINET_ORDERS}>Ссылка-кнопка</Button>   ← рендерит <Link>
*/
export function Button({ variant = 'primary', size = 'md', to, className, children, ...props }) {
  const classes = cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:brightness-100',
    variant !== 'link' && sizes[size],
    variants[variant],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
