import { useState } from 'react'
import { SALES, SaleCard } from '@/entities/sale'
import { PageHero } from '@/widgets/page-hero'
import { SocialBanner } from '@/widgets/social-banner'
import { ROUTES } from '@/shared/config'
import { Container } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import * as images from '@/shared/assets/images/landing'
import { Pagination } from './Pagination'

const TOTAL_PAGES = 24

// 03_Распродажи. MainLayout даёт main отступы py-10, а в макете блоки стоят вплотную к шапке и футеру — гасим их
export function SalesPage() {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  // «Только выкуп с оператором» ведёт в заказ через оператора, «В магазин» — в раздел магазинов
  const handleAction = (sale) => navigate(sale.action === 'В магазин' ? ROUTES.SHOPS : ROUTES.CABINET_VIRTUAL_ORDER)

  return (
    <div className="-my-10 flex flex-col gap-16 lg:gap-[130px]">
      <PageHero title="Распродажи" subtitle="ранний доступ к распродажам в магазинах" current="Распродажи" />

      <Container className="max-w-[1448px]">
        <h2 className="max-w-[700px] text-[28px] leading-snug font-extrabold sm:text-4xl lg:text-[40px] lg:leading-[56px]">
          Black Friday Early Access ранний доступ к распродажам в магазинах Великобритании!
        </h2>

        <div className="mt-10 grid gap-x-9 gap-y-10 lg:grid-cols-2 lg:gap-y-[30px]">
          {SALES.map((sale) => (
            <SaleCard key={sale.id} sale={sale} photo={images[sale.photo]} onAction={handleAction} />
          ))}
        </div>

        <div className="mt-12">
          <Pagination page={page} total={TOTAL_PAGES} onChange={setPage} />
        </div>
      </Container>

      <SocialBanner />
    </div>
  )
}
