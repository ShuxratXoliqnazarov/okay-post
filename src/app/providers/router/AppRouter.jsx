import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Публичные страницы
import { BlogPage } from '@/pages/public/blog'
import { FaqPage } from '@/pages/public/faq'
import { HomePage } from '@/pages/public/home'
import { HowToBuyPage } from '@/pages/public/how-to-buy'
import { NotFoundPage } from '@/pages/public/not-found'
import { PartnersPage } from '@/pages/public/partners'
import { PricesPage } from '@/pages/public/prices'
import { SalesPage } from '@/pages/public/sales'
import { ShopsPage } from '@/pages/public/shops'

// Авторизация
import { ForgotPasswordPage } from '@/pages/auth/forgot-password'
import { LoginPage } from '@/pages/auth/login'
import { RegisterPage } from '@/pages/auth/register'

// Личный кабинет
import { AddressBookPage } from '@/pages/cabinet/address-book'
import { ChangePasswordPage } from '@/pages/cabinet/change-password'
import { CreateParcelPage } from '@/pages/cabinet/create-parcel'
import { NotificationsPage } from '@/pages/cabinet/notifications'
import { OrderCheckoutPage } from '@/pages/cabinet/order-checkout'
import { OrdersPage } from '@/pages/cabinet/orders'
import { ProfilePage } from '@/pages/cabinet/profile'
import { ProfileEditPage } from '@/pages/cabinet/profile-edit'
import { VirtualOrderPage } from '@/pages/cabinet/virtual-order'

// Админ-панель
import { AdminBarcodePage } from '@/pages/admin/barcode'
import { AdminCompanyExpensesPage } from '@/pages/admin/company-expenses'
import { AdminLoginPage } from '@/pages/admin/login'
import { AdminOrderEditPage } from '@/pages/admin/order-edit'
import { AdminOrdersPage } from '@/pages/admin/orders'
import { AdminPageEditorPage } from '@/pages/admin/page-editor'
import { AdminParcelsPage } from '@/pages/admin/parcels'
import { AdminSalaryExpensesPage } from '@/pages/admin/salary-expenses'
import { AdminSettingsPage } from '@/pages/admin/settings'
import { AdminTransactionsPage } from '@/pages/admin/transactions'
import { AdminUserEditPage } from '@/pages/admin/user-edit'
import { AdminUsersPage } from '@/pages/admin/users'

import { AdminLayout, AuthLayout, CabinetLayout, MainLayout } from '@/widgets/layout'
import { ROUTES } from '@/shared/config'
import { AdminRoute } from './AdminRoute'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'

// Все маршруты приложения (декларативный подход).
// Новая страница: создай её в src/pages, добавь путь в shared/config/routes.js и <Route> сюда.
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Сайт: шапка + футер ---------- */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.HOW_TO_BUY} element={<HowToBuyPage />} />
          <Route path={ROUTES.SALES} element={<SalesPage />} />
          <Route path={ROUTES.PRICES} element={<PricesPage />} />
          <Route path={ROUTES.FAQ} element={<FaqPage />} />
          <Route path={ROUTES.PARTNERS} element={<PartnersPage />} />
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path={ROUTES.SHOPS} element={<ShopsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ---------- Личный кабинет: своя шапка и футер, только авторизованные ---------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<CabinetLayout />}>
            <Route path={ROUTES.CABINET} element={<Navigate to={ROUTES.CABINET_PROFILE} replace />} />
            <Route path={ROUTES.CABINET_PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.CABINET_PROFILE_EDIT} element={<ProfileEditPage />} />
            <Route path={ROUTES.CABINET_CHANGE_PASSWORD} element={<ChangePasswordPage />} />
            <Route path={ROUTES.CABINET_ORDERS} element={<OrdersPage />} />
            <Route path={ROUTES.CABINET_VIRTUAL_ORDER} element={<VirtualOrderPage />} />
            <Route path={ROUTES.CABINET_ORDER_CHECKOUT} element={<OrderCheckoutPage />} />
            <Route path={ROUTES.CABINET_CREATE_PARCEL} element={<CreateParcelPage />} />
            <Route path={ROUTES.CABINET_ADDRESS_BOOK} element={<AddressBookPage />} />
            <Route path={ROUTES.CABINET_NOTIFICATIONS} element={<NotificationsPage />} />
          </Route>
        </Route>

        {/* ---------- Авторизация: только для гостей ---------- */}
        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          </Route>
        </Route>

        {/* ---------- Админ-панель ---------- */}
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN} element={<Navigate to={ROUTES.ADMIN_ORDERS} replace />} />
            <Route path={ROUTES.ADMIN_ORDERS} element={<AdminOrdersPage />} />
            <Route path={ROUTES.ADMIN_ORDER_EDIT} element={<AdminOrderEditPage />} />
            <Route path={ROUTES.ADMIN_PARCELS} element={<AdminParcelsPage />} />
            <Route path={ROUTES.ADMIN_BARCODE} element={<AdminBarcodePage />} />
            <Route path={ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
            <Route path={ROUTES.ADMIN_USER_EDIT} element={<AdminUserEditPage />} />
            <Route path={ROUTES.ADMIN_TRANSACTIONS} element={<AdminTransactionsPage />} />
            <Route path={ROUTES.ADMIN_PAGE_EDITOR} element={<AdminPageEditorPage />} />
            <Route path={ROUTES.ADMIN_COMPANY_EXPENSES} element={<AdminCompanyExpensesPage />} />
            <Route path={ROUTES.ADMIN_SALARY_EXPENSES} element={<AdminSalaryExpensesPage />} />
            <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
