import { useState } from 'react'
import { DELIVERY_METHODS, DeliveryMethodRow, calcTotal } from '@/entities/delivery-method'
import { DeliveryCalculatorForm } from '@/features/delivery-calculator'
import { Container } from '@/shared/ui'
import { delivery1, delivery2, delivery3 } from '@/shared/assets/images/landing'

const ICONS = { delivery1, delivery2, delivery3 }

// Блок «калькулятор + варианты доставки» (главная и страница «Цены»)
export function DeliveryEstimate({ title, description }) {
  const [params, setParams] = useState({ weight: 0.5, extra: 0 })

  return (
    <Container className="max-w-[1448px]">
      <h2 className="max-w-[860px] text-[28px] leading-snug font-extrabold sm:text-4xl lg:text-[40px] lg:leading-[56px]">{title}</h2>
      <p className="mt-4 max-w-[790px] text-base leading-8 font-light sm:text-lg sm:leading-9">{description}</p>

      <div className="mt-8 sm:mt-12">
        <DeliveryCalculatorForm onCalculate={setParams} />
      </div>

      <h3 className="mt-16 text-3xl font-extrabold lg:mt-20 lg:text-4xl">Варианты доставки:</h3>
      <ul className="mt-8 flex flex-col gap-5">
        {DELIVERY_METHODS.map((method) => (
          <DeliveryMethodRow
            key={method.id}
            method={method}
            icon={ICONS[method.icon]}
            total={calcTotal(method, params.weight, params.extra)}
          />
        ))}
      </ul>
    </Container>
  )
}
