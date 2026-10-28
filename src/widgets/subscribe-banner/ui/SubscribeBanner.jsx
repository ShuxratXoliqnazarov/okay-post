import { SubscribeForm } from '@/features/subscribe'
import { Container, GradientBanner } from '@/shared/ui'

// Баннер подписки на скидки (главная, перед футером)
export function SubscribeBanner() {
  return (
    <GradientBanner>
      <Container className="grid max-w-[1448px] items-center gap-8 py-10 lg:grid-cols-[450px_1fr] lg:gap-[88px] lg:py-[72px]">
        <h2 className="text-2xl leading-snug font-extrabold sm:text-[28px] lg:leading-10">
          Подпишитесь и будьте в курсе всех скидок и акций магазинов Великобритании!
        </h2>
        <SubscribeForm />
      </Container>
    </GradientBanner>
  )
}
