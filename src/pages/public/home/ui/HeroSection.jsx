import { ROUTES } from '@/shared/config'
import { featherMaskStyle } from '@/shared/lib'
import { Button, Container, GradientBanner } from '@/shared/ui'
import { heroCourier } from '@/shared/assets/images/landing'

// Первый экран: заголовок, текст, кнопка и курьер с глобусом справа
export function HeroSection() {
  return (
    <GradientBanner className="mt-0">
      <Container className="max-w-[1448px] py-10 sm:py-14 lg:min-h-[680px] lg:py-[92px]">
        <div className="relative z-10 max-w-[760px]">
          <h1 className="text-[34px] leading-[1.15] font-extrabold min-[420px]:text-[40px] sm:text-6xl lg:text-[64px] lg:leading-[80px]">
            Доставка товаров<br className="hidden lg:block" /> из Великобритании<br className="hidden lg:block" /> в Россию
          </h1>
          <p className="mt-6 max-w-[660px] text-base leading-8 font-light sm:text-xl sm:leading-[42px] lg:mt-8">
            Начните экономить до 80% на шопинге. Регистрируйтесь в OkeyPost, чтобы покупать со скидками в UK одежду, обувь, гаджеты известных брендов и безопасно отправлять вещи в Россию.
          </p>
          <Button to={ROUTES.REGISTER} className="mt-8 h-[66px] px-12 text-[17px] lg:mt-10">
            Получить адрес в UK
          </Button>
        </div>

        <img
          src={heroCourier}
          alt=""
          style={featherMaskStyle}
          className="mx-auto mt-8 h-[260px] w-auto lg:absolute lg:top-0 lg:right-[70px] lg:mt-0 lg:h-full"
        />
      </Container>
    </GradientBanner>
  )
}
