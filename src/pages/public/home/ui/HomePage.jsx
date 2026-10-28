import { DeliveryEstimate } from '@/widgets/delivery-estimate'
import { PromoBanner } from '@/widgets/promo-banner'
import { SavingsShowcase } from '@/widgets/savings-showcase'
import { SubscribeBanner } from '@/widgets/subscribe-banner'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'
import { bannerShopping, bannerTour } from '@/shared/assets/images/landing'
import { HeroSection } from './HeroSection'
import { ReviewsSection } from './ReviewsSection'
import { SeoSection } from './SeoSection'
import { StepsSection } from './StepsSection'

// 01_Index. MainLayout даёт main отступы py-10, а в макете блоки стоят вплотную к шапке и футеру — гасим их
export function HomePage() {
  return (
    <div className="-my-10 flex flex-col gap-16 lg:gap-40">
      <HeroSection />
      <SavingsShowcase />

      <PromoBanner
        image={bannerShopping}
        title="Поручите нашим мастерам шопинга оформить заказы в английских магазинах и освободите время для более важных дел."
        text="Такой способ покупки также подойдёт, если магазин принимает только английские карты."
      >
        <Button to={ROUTES.REGISTER} className="mt-6 h-[66px] px-12 text-[17px] sm:mt-8">
          Попробовать
        </Button>
      </PromoBanner>

      <DeliveryEstimate
        title="OkeyPost удобная и быстрая доставка посылок из Великобритании"
        description="Рассчитайте стоимость доставки из Англии к вам домой. Мы получим ваши посылки на складе, при необходимости объединим несколько доставок в одну и отправим их к вам надежно упакованными."
      />

      <StepsSection />

      <PromoBanner
        image={bannerTour}
        title="Виртуальный тур по нашему складу в реальном времени"
        text="Вы можете всегда посмотреть на нашу слаженую работу на складе"
      >
        <Button to={ROUTES.REGISTER} className="mt-6 h-[66px] px-12 text-[17px] sm:mt-8">
          Попробовать
        </Button>
      </PromoBanner>

      <ReviewsSection />
      <SeoSection />
      <SubscribeBanner />
    </div>
  )
}
