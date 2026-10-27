import { getVirtualAddressRows } from '@/entities/user'
import { InfoTable, PageTitle, PaymentLogo } from '@/shared/ui'
import { REQUISITES } from '../model/requisites'
import { WORK_INFO } from '../model/workInfo'

export function VirtualAddressTab({ user }) {
  return (
    <>
      <PageTitle as="h2" className="mb-5">
        Ваш виртуальный адрес:
      </PageTitle>
      <InfoTable rows={getVirtualAddressRows(user)} />
    </>
  )
}

export function WorkInfoTab() {
  return (
    <>
      <PageTitle as="h2" className="mb-6">
        Информация по работе с сайтом
      </PageTitle>
      <div className="flex flex-col gap-8">
        {WORK_INFO.map(({ title, items }) => (
          <section key={title}>
            <h3 className="mb-3 text-lg font-bold sm:text-xl">{title}</h3>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-base leading-[28px] font-light marker:text-dark sm:text-lg sm:leading-[30px]">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

export function RequisitesTab() {
  return (
    <div className="flex flex-col gap-10">
      {REQUISITES.map(({ title, rows, logo }) => (
        <section key={title}>
          <PageTitle as="h2" className="mb-4">
            {title}
          </PageTitle>
          {logo ? <PaymentLogo type={logo} framed className="w-24" /> : <InfoTable rows={rows} />}
        </section>
      ))}
    </div>
  )
}
