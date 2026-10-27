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
├── features/   # Действия пользователя: вход, регистрация, поиск посылки
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
│   │       └── PublicOnlyRoute.jsx  # только для гостей (login/register)
│   └── styles/index.css             # Tailwind + цвета/шрифты из Figma (@theme)
│
├── pages/
│   ├── home/          # /
│   ├── tracking/      # /tracking
│   ├── profile/       # /profile (защищённая)
│   ├── login/         # /login
│   ├── register/      # /register
│   └── not-found/     # 404
│
├── widgets/
│   ├── header/        # шапка + навигация
│   ├── footer/
│   └── layout/        # MainLayout (шапка+футер), AuthLayout (карточка по центру)
│
├── features/
│   ├── login/         # ui/LoginForm.jsx + model/schema.js
│   ├── register/      # ui/RegisterForm.jsx + model/schema.js
│   ├── logout/        # ui/LogoutButton.jsx
│   └── track-parcel/  # ui/TrackParcelForm.jsx + model/schema.js
│
├── entities/
│   ├── user/          # model/store.js (useUserStore), api/userApi.js
│   └── parcel/        # model/store.js, model/constants.js, api/, ui/ParcelCard.jsx
│
└── shared/
    ├── api/           # request() — базовый fetch-клиент
    ├── config/        # ROUTES, API_URL
    ├── lib/           # cn() и другие утилиты
    ├── ui/            # Button, Input, Container
    └── assets/        # icons/, images/ (из Figma)
```

## Как добавить…

**Новую страницу**
1. `src/pages/<name>/ui/<Name>Page.jsx` + `src/pages/<name>/index.js`
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

- Папки слайсов — `kebab-case` (`track-parcel`, `not-found`)
- Компоненты — `PascalCase.jsx` (`LoginForm.jsx`)
- Остальное — `camelCase.js` (`userApi.js`, `store.js`)
- Сторы — `use<Name>Store`
- Только именованные экспорты (`export function`), без `export default`

## Работа в команде (git)

- `main` — стабильная ветка, напрямую не пушим
- Ветка на задачу: `feature/login-page`, `fix/header-mobile`
- Перед PR: `npm run lint` и `npm run build` без ошибок
