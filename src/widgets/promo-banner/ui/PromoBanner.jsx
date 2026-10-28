import { featherMaskStyle } from '@/shared/lib'
import { Container, GradientBanner } from '@/shared/ui'

// Градиентный баннер: слева иллюстрация, справа заголовок, текст и действие (children — кнопка или форма)
export function PromoBanner({ image, title, text, children }) {
  return (
    <GradientBanner>
      <Container className="grid max-w-[1448px] items-center gap-6 py-8 sm:py-10 lg:grid-cols-[477px_1fr] lg:gap-0 lg:py-0 xl:grid-cols-[477px_1fr]">
        {/* Иллюстрация вырезана вместе с градиентом — края сглаживаем маской */}
        <img
          src={image}
          alt=""
          loading="lazy"
          style={featherMaskStyle}
          className="mx-auto h-[220px] w-auto max-w-full object-contain sm:h-[300px] lg:-ml-5 lg:h-[430px] lg:self-center"
        />

        <div className="py-2 lg:py-[60px]">
          <h2 className="max-w-[780px] text-2xl leading-snug font-extrabold sm:text-[28px] lg:text-[28px] lg:leading-10">{title}</h2>
          {text && <p className="mt-4 max-w-[780px] text-sm leading-relaxed font-light sm:text-[15px]">{text}</p>}
          {children}
        </div>
      </Container>
    </GradientBanner>
  )
}
