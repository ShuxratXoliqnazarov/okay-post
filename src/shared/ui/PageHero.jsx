import { Link } from 'react-router-dom'
import { Container } from '@/shared/ui'
import { cn } from '@/shared/lib'

export function PageHero({ breadcrumbs = [], title, subtitle, children, className }) {
  return (
    <Container className={cn('mb-10 sm:mb-12', className)}>
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#5B52A3] via-[#4884C6] to-[#41B7E9] px-6 py-10 text-white shadow-[0_12px_36px_rgba(91,82,163,0.25)] sm:rounded-[32px] sm:px-12 sm:py-14">
        {/* Декоративные световые акценты */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/4 h-52 w-52 rounded-full bg-[#00c97b]/20 blur-3xl" />

        <div className="relative z-10">
          {/* Хлебные крошки */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-white/70 sm:text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{crumb.label}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && <span className="text-white/50">/</span>}
                </div>
              ))}
            </nav>
          )}

          {/* Заголовок */}
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-[40px] leading-tight">
            {title}
          </h1>

          {/* Подзаголовок */}
          {subtitle && (
            <p className="mt-2 text-base font-normal text-white/90 sm:text-lg lg:text-xl">
              {subtitle}
            </p>
          )}

          {/* Дополнительный контент (кнопка действия и т.д.) */}
          {children && <div className="mt-6 sm:mt-8">{children}</div>}
        </div>
      </div>
    </Container>
  )
}
