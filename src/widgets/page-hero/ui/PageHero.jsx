import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { Button, Container, GradientBanner } from '@/shared/ui'

// Градиентная шапка внутренних страниц: хлебные крошки, заголовок, подзаголовок и кнопка «Получить адрес в UK»
export function PageHero({ title, subtitle, current, withButton = true }) {
  return (
    <GradientBanner>
      <Container className="max-w-[1448px] py-8 sm:py-10 lg:pb-[84px]">
        <nav aria-label="Хлебные крошки" className="text-xs font-light text-white/90">
          <Link to={ROUTES.HOME} className="hover:underline">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span>{current}</span>
        </nav>

        <h1 className="mt-6 text-[32px] leading-tight font-extrabold sm:text-5xl lg:mt-8 lg:text-[48px]">{title}</h1>
        {subtitle && <p className="mt-4 text-lg font-bold sm:text-xl">{subtitle}</p>}

        {withButton && (
          <Button to={ROUTES.REGISTER} className="mt-8 h-[66px] px-12 text-[17px] sm:mt-10">
            Получить адрес в UK
          </Button>
        )}
      </Container>
    </GradientBanner>
  )
}
