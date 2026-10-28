import { Fragment } from 'react'
import { ROUTES } from '@/shared/config'
import { Button, Container } from '@/shared/ui'
import * as images from '@/shared/assets/images/landing'
import { HOME_STEPS } from '../model/content'

// {{зелёный}} в тексте шага
function StepText({ text }) {
  return text.split(/(\{\{.+?\}\})/g).map((part, i) =>
    part.startsWith('{{') ? (
      <b key={i} className="font-bold text-primary">
        {part.slice(2, -2)}
      </b>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

// «4 простых шага для ваших покупок в Великобритании»
export function StepsSection() {
  return (
    <Container className="max-w-[1448px]">
      <h2 className="max-w-[600px] text-[28px] leading-snug font-extrabold sm:text-4xl lg:text-[40px] lg:leading-[56px]">
        4 простых шага для ваших покупок в Великобритании
      </h2>

      <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-10">
        {HOME_STEPS.map((step) => (
          <li key={step.id}>
            <img src={images[step.image]} alt="" loading="lazy" className="h-[215px] w-auto max-w-full object-contain" />
            <h3 className="mt-9 max-w-[200px] text-[17px] leading-6 font-bold">{step.title}</h3>
            <p className="mt-4 max-w-[310px] text-sm leading-[30px] font-light">
              <StepText text={step.text} />
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-10 max-w-[760px] text-lg leading-9 font-light">
        Не хотите разбираться самостоятельно, наши мастера шопинга с радостью купят все товары за вас.
      </p>
      <Button to={ROUTES.CABINET_VIRTUAL_ORDER} className="mt-7 h-[66px] px-12 text-[17px]">
        Быстрая покупка
      </Button>
    </Container>
  )
}
