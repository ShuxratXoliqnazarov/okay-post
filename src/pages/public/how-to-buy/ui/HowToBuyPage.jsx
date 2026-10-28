import { Fragment } from 'react'
import { PageHero } from '@/widgets/page-hero'
import { SocialBanner } from '@/widgets/social-banner'
import { ROUTES } from '@/shared/config'
import { Button, Container } from '@/shared/ui'
import * as images from '@/shared/assets/images/landing'
import { BUY_STEPS } from '../model/steps'

function RichText({ text }) {
  return text.split(/(\{\{.+?\}\})/g).map((part, i) =>
    part.startsWith('{{') ? (
      <a key={i} href="#" className="font-bold text-primary hover:text-primary-dark">
        {part.slice(2, -2)}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

// 02_Как покупать. MainLayout даёт main отступы py-10, а в макете блоки стоят вплотную к шапке и футеру — гасим их
export function HowToBuyPage() {
  return (
    <div className="-my-10 flex flex-col gap-16 lg:gap-[130px]">
      <PageHero title="Научим покупать в Великобритании!" subtitle="и экономить до 70%" current="Как покупать" />

      <Container className="max-w-[1448px]">
        <h2 className="text-[28px] leading-snug font-extrabold sm:text-4xl lg:text-[40px]">Покупать в Великобритании очень просто</h2>
        <p className="mt-4 max-w-[930px] text-base leading-8 font-light sm:text-lg sm:leading-9">
          Английские магазины не доставляют в Россию, но это не проблема. С OkeyPost можно покупать по лучшим ценам и экономить на доставке. Мы получим ваши посылки, надежно упакуем и отправим их к вам домой.
        </p>

        <ol className="mt-12 flex flex-col gap-12 lg:gap-[70px]">
          {BUY_STEPS.map((step) => (
            <li key={step.id} className="grid items-start gap-6 sm:grid-cols-[240px_1fr] sm:gap-10 lg:grid-cols-[300px_1fr] lg:gap-[70px]">
              <img src={images[step.image]} alt="" loading="lazy" className="h-auto w-[240px] max-w-full object-contain lg:w-[300px]" />

              <div>
                <div className="flex items-center gap-6 lg:gap-8">
                  <span className="text-[56px] leading-none font-light text-primary lg:text-[80px]">{String(step.id).padStart(2, '0')}</span>
                  <h3 className="max-w-[330px] border-l border-line py-3 pl-6 text-lg leading-9 font-bold lg:pl-8 lg:text-xl">{step.title}</h3>
                </div>
                <div className="mt-3 flex max-w-[1030px] flex-col gap-3 text-[15px] leading-9 font-light">
                  {step.text.map((paragraph) => (
                    <p key={paragraph.slice(0, 20)}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Button to={ROUTES.REGISTER} className="mt-12 h-[66px] px-12 text-[17px] lg:mt-10">
          Получить адрес в UK
        </Button>
      </Container>

      <SocialBanner />
    </div>
  )
}
