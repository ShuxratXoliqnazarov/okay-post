import { useSearchParams } from 'react-router-dom'
import { selectUser, useUserStore } from '@/entities/user'
import { Tabs } from '@/shared/ui'
import { ProfileCard } from './ProfileCard'
import { RequisitesTab, VirtualAddressTab, WorkInfoTab } from './ProfileTabs'

const TABS = [
  { value: 'address', label: 'Виртуальный адрес' },
  { value: 'info', label: 'Информация о работе' },
  { value: 'requisites', label: 'Реквизиты для оплаты' },
]

// Figma: 08_ЛК_Профиль_Ваш виртуальный, 12 и 13 (вкладки). Активная вкладка — в URL: ?tab=info
export function ProfilePage() {
  const user = useUserStore(selectUser)
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = TABS.some((item) => item.value === searchParams.get('tab')) ? searchParams.get('tab') : 'address'

  return (
    <>
      <ProfileCard user={user} />

      <Tabs
        tabs={TABS}
        value={tab}
        onChange={(value) => setSearchParams({ tab: value }, { replace: true })}
        className="mt-14 mb-12 w-fit max-w-full"
      />

      {tab === 'address' && <VirtualAddressTab user={user} />}
      {tab === 'info' && <WorkInfoTab />}
      {tab === 'requisites' && <RequisitesTab />}
    </>
  )
}
