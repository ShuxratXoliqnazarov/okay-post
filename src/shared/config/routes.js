// все пути тут, строкой в компонентах не писать
export const ROUTES = {
  // сайт
  HOME: '/',
  HOW_TO_BUY: '/how-to-buy',
  SALES: '/sales',
  PRICES: '/prices',
  FAQ: '/faq',
  PARTNERS: '/partners',
  BLOG: '/blog',
  SHOPS: '/shops',

  // авторизация
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // лк
  CABINET: '/cabinet',
  CABINET_PROFILE: '/cabinet/profile',
  CABINET_PROFILE_EDIT: '/cabinet/profile/edit',
  CABINET_CHANGE_PASSWORD: '/cabinet/profile/password',
  CABINET_ORDERS: '/cabinet/orders',
  CABINET_PARCELS: '/cabinet/orders#parcels', // якорь, не отдельный роут
  CABINET_TRANSACTIONS: '/cabinet/orders#transactions', // якорь, не отдельный роут
  CABINET_VIRTUAL_ORDER: '/cabinet/orders/virtual',
  CABINET_ORDER_CHECKOUT: '/cabinet/orders/checkout',
  CABINET_CREATE_PARCEL: '/cabinet/parcels/new',
  CABINET_ADDRESS_BOOK: '/cabinet/address-book',
  CABINET_NOTIFICATIONS: '/cabinet/notifications',

  // админка
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_EDIT: '/admin/orders/:id',
  ADMIN_PARCELS: '/admin/parcels',
  ADMIN_BARCODE: '/admin/barcode',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_EDIT: '/admin/users/:id',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_PAGE_EDITOR: '/admin/page-editor',
  ADMIN_COMPANY_EXPENSES: '/admin/company-expenses',
  ADMIN_SALARY_EXPENSES: '/admin/salary-expenses',
  ADMIN_SETTINGS: '/admin/settings',
}

export const getOrderCheckoutEditPath = (id) => `/cabinet/orders/checkout?id=${id}`
export const getProfileTabPath = (tab) => `/cabinet/profile?tab=${tab}`
export const getAdminOrderEditPath = (id) => `/admin/orders/${id}`
export const getAdminUserEditPath = (id) => `/admin/users/${id}`
