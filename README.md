# Okey Post

Дизайн: [Figma](https://www.figma.com/design/1dqtPzI96B0uz2MRKSYTIs/Okey-Post--Copy-?node-id=0-1)

## Стек

| Что               | Чем                              |
| ----------------- | -------------------------------- |
| Сборка            | Vite + React (JS)                |
| Стили             | Tailwind CSS v4                  |
| Роутинг           | react-router-dom (декларативно: `<BrowserRouter>` + `<Routes>`) |
| Глобальный стейт  | Zustand                          |
| Формы             | react-hook-form                  |
| Валидация         | Zod (`@hookform/resolvers/zod`)  |
| Иконки            | @phosphor-icons/react (те же, что в макете) |
| Классы            | tailwind-merge внутри `cn()`    |
| Линтер            | oxlint                           |

## Запуск

```bash
npm install
cp .env.example .env   # указать VITE_API_URL
npm run dev
```

Команды: `npm run dev` · `npm run build` · `npm run preview` · `npm run lint`

## Архитектура — Feature-Sliced Design (FSD)

```
src/
├── app/        # Точка входа: main.jsx, App.jsx, роутер, глобальные стили
├── pages/      # Страницы (одна папка = один маршрут)
├── widgets/    # Крупные самостоятельные блоки: Header, Footer, Layout'ы
├── features/   # Действия пользователя: вход, регистрация, восстановление пароля
├── entities/   # Бизнес-сущности: user, parcel (стор, API, карточки)
└── shared/     # Переиспользуемое без бизнес-логики: UI-кит, api-клиент, конфиг, утилиты
```

### Главное правило импортов

Слой может импортировать **только из слоёв ниже себя**:

```
app → pages → widgets → features → entities → shared
```

- ✅ `features/login` импортирует из `entities/user` и `shared/ui`
- ❌ `entities/user` импортирует из `features/...`
- ❌ `features/login` импортирует из `features/register` (слайсы одного слоя не знают друг о друге)

### Публичный API (index.js)

Каждый слайс экспортирует наружу только через свой `index.js`.

```js
// ✅ правильно
import { LoginForm } from '@/features/login'
// ❌ неправильно — лезем внутрь слайса
import { LoginForm } from '@/features/login/ui/LoginForm'
```

Внутри своего слайса — относительные импорты (`../model/schema`).
Между слайсами/слоями — всегда алиас `@/`.

### Сегменты внутри слайса

| Папка    | Что лежит                                         |
| -------- | ------------------------------------------------- |
| `ui/`    | React-компоненты                                  |
| `model/` | Zustand-стор, zod-схемы, константы, хуки логики  |
| `api/`   | Запросы к бэкенду (через `request` из `shared/api`) |

## Карта проекта

```
src/
├── app/
│   ├── main.jsx                     # createRoot, подключение стилей
│   ├── App.jsx
│   ├── providers/
│   │   ├── index.js
│   │   └── router/
│   │       ├── AppRouter.jsx        # ВСЕ маршруты здесь
│   │       ├── ProtectedRoute.jsx   # только для авторизованных
│   │       ├── AdminRoute.jsx       # только для role: admin
│   │       └── PublicOnlyRoute.jsx  # только для гостей (login/register)
│   └── styles/index.css             # Tailwind + цвета/шрифты из Figma (@theme)
│
├── pages/             # страницы сгруппированы по зонам (таблица ниже)
│   ├── public/        # сайт для всех
│   ├── auth/          # вход / регистрация / забыли пароль
│   ├── cabinet/       # личный кабинет (ЛК)
│   └── admin/         # админ-панель
│
├── widgets/
│   ├── header/, footer/           # шапка и футер публичного сайта
│   ├── cabinet-header/            # шапка ЛК: меню, бейдж уведомлений, аватар, бургер
│   ├── cabinet-info-bar/          # градиентная полоса: время в Лондоне, баланс, пополнение
│   ├── cabinet-footer/
│   ├── orders-section/            # таблица заказов: вкладки, поиск, фильтр, оплата
│   ├── parcels-section/           # таблица посылок: тултип габаритов, оплата
│   ├── transactions-section/      # таблица транзакций: фильтр, скачать счёт
│   └── layout/                    # MainLayout, AuthLayout, CabinetLayout, AdminLayout
│
├── features/                      # в каждой: ui/<Name>.jsx + model/schema.js (zod)
│   ├── login/, register/, forgot-password/, logout/
│   ├── edit-profile/              # форма профиля + загрузка фото с превью
│   ├── change-password/
│   ├── pay/                       # кнопка «Оплатить» + модалка выбора метода оплаты
│   ├── top-up-balance/            # «Пополнить счет» / «Добавить транзакцию»
│   ├── create-virtual-order/      # заказ, выкупленный самостоятельно
│   ├── checkout-order/            # оформление заказа: несколько товаров, черновик, подтверждение
│   ├── create-parcel/             # запрос на формирование посылки
│   ├── address-form/              # адрес получателя (создать/редактировать)
│   ├── filter-orders/             # фильтр заказов по периоду/датам/ID
│   └── filter-transactions/       # фильтр транзакций по датам/типу
│
├── entities/
│   ├── user/          # useUserStore (текущий пользователь), userApi (вход, регистрация, профиль)
│   ├── order/         # заказы        ─┐
│   ├── parcel/        # посылки        │ в каждом: model/mock.js, model/constants.js,
│   ├── transaction/   # транзакции     │ model/store.js, api/<name>Api.js
│   ├── address/       # адресная книга │
│   └── notification/  # уведомления   ─┘ + ui/<Name>StatusIcon.jsx (иконка статуса)
│
└── shared/
    ├── api/           # request(), фейковая база (fakeDb), токен (session)
    ├── config/        # ROUTES, API_URL
    ├── lib/           # cn(), общие zod-правила (validation.js)
    ├── ui/            # UI-кит: Button, Input, Select, Textarea, Checkbox, Radio, Modal, Tabs,
    │                  # Table, InfoTable, Tooltip, Card, Avatar, Badge, Logo, PaymentLogo...
    └── assets/        # icons/, images/ (из Figma)
```

## Страницы ↔ Figma

✅ — сверстано по макету. Остальные пока заглушки `<PageStub />` с названием фрейма:
берёшь страницу → удаляешь `PageStub` → верстаешь по фрейму, используя UI-кит из `shared/ui`.

| Папка | URL | Фрейм в Figma |
| --- | --- | --- |
| **public/** | | |
| `home` | `/` | 01_Index |
| `how-to-buy` | `/how-to-buy` | 02_Как покупать |
| `sales` | `/sales` | 03_Распродажи |
| `prices` | `/prices` | 04_Цены |
| `faq` | `/faq` | 05_Часто задаваемые вопросы |
| `partners` | `/partners` | 06_Партнерская программа |
| `blog` | `/blog` | 07_Блог |
| `shops` | `/shops` | 08_Магазины |
| `not-found` | любой неизвестный URL | — |
| **auth/** (в Figma это попапы) | | |
| `login` | `/login` | 09_Вход_Забыли пароль |
| `register` | `/register` | 09_Вход_Забыли пароль |
| `forgot-password` | `/forgot-password` | 09_Вход_Забыли пароль |
| **cabinet/** (только после входа) | | |
| ✅ `profile` | `/cabinet/profile?tab=` `address` / `info` / `requisites` | 08, 12, 13 (вкладки профиля) |
| ✅ `profile-edit` | `/cabinet/profile/edit` | 10_ЛК_Профиль_Редактирование |
| ✅ `change-password` | `/cabinet/profile/password` | 11_ЛК_Профиль_Изменить пароль |
| ✅ `orders` | `/cabinet/orders` (+ `#parcels`, `#transactions`) | 17, 18_фильтр, 18_оплата (модалка) |
| ✅ `virtual-order` | `/cabinet/orders/virtual` | 19_ЛК_Заказы_Виртуальный заказ |
| ✅ `order-checkout` | `/cabinet/orders/checkout` (`?id=` — черновик) | 20_ЛК_Заказы_Оформление заказа |
| ✅ `create-parcel` | `/cabinet/parcels/new` | 22_ЛК_Создание посылки |
| ✅ `address-book` | `/cabinet/address-book` | 24_Адресная книга |
| ✅ `notifications` | `/cabinet/notifications` | 25_Уведомления |
| **admin/** (только `role: 'admin'`) | | |
| `login` | `/admin/login` | Admin Panel / Вход |
| `orders` | `/admin/orders` | Заказы |
| `order-edit` | `/admin/orders/:id` | Редактирование заказа |
| `parcels` | `/admin/parcels` | Посылки |
| `barcode` | `/admin/barcode` | Сформировать баркод |
| `users` | `/admin/users` | Пользователи |
| `user-edit` | `/admin/users/:id` | Редактирование пользователя |
| `transactions` | `/admin/transactions` | Транзакции |
| `page-editor` | `/admin/page-editor` | Редактор страниц |
| `company-expenses` | `/admin/company-expenses` | Расходы фирмы |
| `salary-expenses` | `/admin/salary-expenses` | Расходы по ЗП |
| `settings` | `/admin/settings` | Настройки |

Пути с параметрами собирай функциями из `shared/config`: `getOrderCheckoutEditPath(id)`, `getProfileTabPath(tab)`, `getAdminOrderEditPath(id)`, `getAdminUserEditPath(id)`.

## Данные (фейковый бэкенд)

Настоящего сервера пока нет — данные хранятся в **localStorage** через фейковое API.

```
Компонент → use<Name>Store (zustand) → <name>Api (entities/<name>/api) → fakeDb (localStorage)
```

- `shared/api/fakeDb.js` — «база»: коллекции `okeypost-db-users`, `-orders`, `-parcels`, `-transactions`, `-addresses`, `-notifications`
- `entities/<name>/model/mock.js` — стартовые данные (заливаются при первом запуске)
- `entities/<name>/api/<name>Api.js` — методы `getAll / getById / create / update / remove` (с задержкой 400 мс, как сеть)
- `entities/<name>/model/store.js` — состояние на экране: список, `isLoading`, `error`

```jsx
const { orders, isLoading, error, fetchOrders } = useOrderStore()
useEffect(() => { fetchOrders() }, [fetchOrders])
```

**Тестовые аккаунты:** `test@okeypost.com / test1234` (с заказами, посылками и т.д.), `admin@okeypost.com / admin1234` (админ).

**Сбросить данные:** DevTools → Application → Local Storage → удалить ключи `okeypost-*` → обновить страницу.

Когда появится бэкенд — переписываем только `entities/*/api/*.js` на `request()`, компоненты не трогаем.

## Валидация форм

Общие правила полей — в `shared/lib/validation.js`: `emailField`, `phoneField`, `nameField`, `passwordField`, `requiredString()`. Схема формы собирается из них в `features/<name>/model/schema.js`, чтобы все формы проверяли поля одинаково.

## Как добавить…

**Новую страницу**
1. `src/pages/<зона>/<name>/ui/<Name>Page.jsx` + `index.js` (зона: public / auth / cabinet / admin)
2. Путь в `src/shared/config/routes.js`
3. `<Route>` в `src/app/providers/router/AppRouter.jsx`

**Новую форму** (фича)
1. `src/features/<name>/model/schema.js` — zod-схема
2. `src/features/<name>/ui/<Name>Form.jsx` — `useForm({ resolver: zodResolver(schema) })`
3. Экспорт в `src/features/<name>/index.js`

**Новый глобальный стейт** — `src/entities/<name>/model/store.js` (Zustand), экспорт через `index.js`.

**Новый UI-компонент** (кнопка, модалка, селект) — `src/shared/ui/`, экспорт в `src/shared/ui/index.js`.

**Цвета из Figma** — `src/app/styles/index.css` → блок `@theme`.

## Нейминг

- Папки слайсов — `kebab-case` (`forgot-password`, `not-found`)
- Компоненты — `PascalCase.jsx` (`LoginForm.jsx`)
- Остальное — `camelCase.js` (`userApi.js`, `store.js`)
- Сторы — `use<Name>Store`
- Только именованные экспорты (`export function`), без `export default`

## Работа в команде (git)

- `main` — стабильная ветка, напрямую не пушим
- Ветка на задачу: `feature/login-page`, `fix/header-mobile`
- Перед PR: `npm run lint` и `npm run build` без ошибок
