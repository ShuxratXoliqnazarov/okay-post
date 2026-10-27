import { AlarmIcon, BankIcon, ClockIcon, CurrencyCircleDollarIcon } from '@phosphor-icons/react'
import { selectUser, useUserStore } from '@/entities/user'
import { TopUpBalanceButton } from '@/features/top-up-balance'
import { Container, PaymentLogo, Tooltip, TooltipRows } from '@/shared/ui'
import { useLondonTime } from '../model/useLondonTime'

// TODO: курсы брать с бэка
const EXCHANGE_RATES = [
  { label: 'USD', value: '£1 = $1.27' },
  { label: 'EUR', value: '£1 = €1.17' },
  { label: 'TJS', value: '£1 = 13.80 сомони' },
]

const WORKING_HOURS = 'Пн.-Пт. 09:00-18:00 Сб. 09:00-14:00'

function InfoItem({ icon, className, children }) {
  return (
    <span className={`items-center gap-3 text-[13px] font-medium whitespace-nowrap ${className ?? 'flex'}`}>
      {icon}
      {children}
    </span>
  )
}

export function CabinetInfoBar() {
  const user = useUserStore(selectUser)
  const londonTime = useLondonTime()

  return (
    <div className="bg-linear-to-r from-indigo to-accent text-white sm:rounded-[40px]">
      <Container className="flex min-h-[82px] flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 lg:min-h-[110px]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <InfoItem icon={<ClockIcon size={26} />}>
            Лондон: <span className="tabular-nums">{londonTime}</span>
          </InfoItem>
          <InfoItem icon={<AlarmIcon size={26} />} className="hidden xl:flex">
            {WORKING_HOURS}
          </InfoItem>
          <Tooltip content={<TooltipRows rows={EXCHANGE_RATES} />} className="hidden lg:inline-flex">
            <InfoItem icon={<BankIcon size={26} />} className="hidden lg:flex">
              Курс валют
            </InfoItem>
          </Tooltip>
          <InfoItem icon={<CurrencyCircleDollarIcon size={26} />} className="hidden md:flex">
            Бонусный счет: £ {user?.bonus ?? 0}
          </InfoItem>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <InfoItem>Ваш баланс: £ {user?.balance ?? 0}</InfoItem>
          <TopUpBalanceButton className="h-12 w-[150px] px-0 text-[11px] sm:w-[150px]">
            Добавить транзакцию
          </TopUpBalanceButton>
          <div className="hidden gap-2 sm:flex">
            <PaymentLogo type="paypal" framed className="w-24" />
            <PaymentLogo type="card" framed className="w-[75px]" />
          </div>
        </div>
      </Container>
    </div>
  )
}
