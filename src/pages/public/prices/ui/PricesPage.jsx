import {
  EXTRA_PACKAGING,
  INSURANCE,
  OPERATOR_SERVICES,
  PriceRow,
  SERVICE_HIGHLIGHTS,
  WAREHOUSE_SERVICES,
} from '@/entities/service-price'
import { OrderByLinkForm } from '@/features/order-by-link'
import { DeliveryEstimate } from '@/widgets/delivery-estimate'
import { PageHero } from '@/widgets/page-hero'
import { PromoBanner } from '@/widgets/promo-banner'
import { SocialBanner } from '@/widgets/social-banner'
import { Container } from '@/shared/ui'
import { bannerOperator } from '@/shared/assets/images/landing'
import { HighlightsSection } from './HighlightsSection'

function PriceSection({ title, children }) {
  return (
    <Container className="max-w-[1448px]">
      <h2 className="text-[28px] leading-snug font-extrabold sm:text-4xl lg:text-[40px]">{title}</h2>
      <div className="mt-9 flex flex-col gap-5">{children}</div>
    </Container>
  )
}

// Карточки в две колонки, затем (если есть) строки на всю ширину
function PriceList({ items }) {
  const half = items.filter((item) => item.layout === 'half')
  const rest = items.filter((item) => item.layout !== 'half')

  return (
    <>
      {half.length > 0 && (
        <ul className="grid gap-5 md:grid-cols-2 md:gap-x-[30px]">
          {half.map((item) => (
            <PriceRow key={item.id} item={item} />
          ))}
        </ul>
      )}
      {rest.length > 0 && (
        <ul className="flex flex-col gap-5">
          {rest.map((item) => (
            <PriceRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </>
  )
}

// 04_Цены. MainLayout даёт main отступы py-10, а в макете блоки стоят вплотную к шапке и футеру — гасим их
export function PricesPage() {
  return (
    <div className="-my-10 flex flex-col gap-16 lg:gap-[170px]">
      <PageHero title="Услуги доставки из Великобритании" current="Цены" withButton={false} />

      <HighlightsSection items={SERVICE_HIGHLIGHTS} />

      <DeliveryEstimate
        title="Онлайн-калькулятор стоимости доставки товара"
        description="Задайте необходимые параметры посылки, и калькулятор рассчитает приблизительную стоимость доставки вашей посылки из Англии."
      />

      <PriceSection title="Услуги склада">
        <PriceList items={WAREHOUSE_SERVICES} />
      </PriceSection>

      <PriceSection title="Покупки с операторами Okeypost.com">
        <PriceList items={OPERATOR_SERVICES} />
      </PriceSection>

      <PromoBanner
        image={bannerOperator}
        title="Попробуйте заказывать с оператором прямо сейчас. Пришлите ссылку на товар, его купят и доставят на наш склад в кратчайшие сроки."
      >
        <OrderByLinkForm />
      </PromoBanner>

      <PriceSection title="Страхование">
        <PriceList items={INSURANCE} />
      </PriceSection>

      <PriceSection title="Дополнительная упаковка">
        <PriceList items={EXTRA_PACKAGING} />
      </PriceSection>

      <SocialBanner />
    </div>
  )
}
