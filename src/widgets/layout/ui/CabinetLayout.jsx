import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNotificationStore } from '@/entities/notification'
import { CabinetFooter } from '@/widgets/cabinet-footer'
import { CabinetHeader } from '@/widgets/cabinet-header'
import { CabinetInfoBar } from '@/widgets/cabinet-info-bar'
import { Container } from '@/shared/ui'

// Обёртка личного кабинета: своя шапка + градиентная инфо-полоса + контент + футер ЛК
export function CabinetLayout() {
  const fetchNotifications = useNotificationStore((state) => state.fetchNotifications)

  // Уведомления нужны на всех страницах ЛК — для бейджа в меню
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return (
    <div className="flex min-h-screen flex-col">
      <CabinetHeader />
      <CabinetInfoBar />
      <main className="flex-1 py-10 lg:py-[60px]">
        <Container>
          <Outlet />
        </Container>
      </main>
      <CabinetFooter />
    </div>
  )
}
