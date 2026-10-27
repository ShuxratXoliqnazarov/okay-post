import { Outlet } from 'react-router-dom'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
