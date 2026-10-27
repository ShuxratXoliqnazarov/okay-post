import { useMemo, useState } from 'react'
import { FileTextIcon, FunnelIcon, MagnifyingGlassIcon, UserGearIcon, UserIcon } from '@phosphor-icons/react'
import {
  getOrderAmount,
  ORDER_STATUS,
  ORDER_TYPE,
  OrderStatusIcon,
  useOrderStore,
} from '@/entities/order'
import { getFullName, selectUser, useUserStore } from '@/entities/user'
import { DEFAULT_ORDERS_FILTER, filterOrders, OrdersFilter } from '@/features/filter-orders'
import { PayButton } from '@/features/pay'
import { getOrderCheckoutEditPath, ROUTES } from '@/shared/config'
import { formatDate, formatMoney, formatWeight, useSort } from '@/shared/lib'
import {
  Button,
  EmptyRow,
  IconButton,
  Input,
  PageTitle,
  SortableHeader,
  Table,
  Tabs,
  Td,
  Th,
  Tooltip,
  Tr,
} from '@/shared/ui'

const TABS = [
  { value: 'all', label: 'Все' },
  { value: 'mine', label: 'Мои заказы' }, // выкупленные самостоятельно (виртуальные)
]

// Подсказка к сумме: из чего она состоит
function AmountTooltip({ order }) {
  if (order.type === ORDER_TYPE.VIRTUAL) return 'Сумма, указанная при оформлении'
  return (
    <span className="flex flex-col gap-1">
      {order.items.map((item, index) => (
        <span key={index}>
          {item.name} × {item.quantity} — {formatMoney(item.price * item.quantity)}
        </span>
      ))}
    </span>
  )
}

function OrderAction({ order, onPaid }) {
  if (order.status === ORDER_STATUS.AWAITING_PAYMENT) {
    return <PayButton amount={order.amountValue} description={`Оплата заказа ID ${order.id}`} onPaid={onPaid} />
  }
  if (order.status === ORDER_STATUS.PROCESSING) {
    return (
      <Button variant="outline" size="sm" disabled className="w-[90px] border-line px-0 text-muted/60">
        В обработке
      </Button>
    )
  }
  if (order.status === ORDER_STATUS.DRAFT) {
    return (
      <Button variant="outline" size="sm" to={getOrderCheckoutEditPath(order.id)} className="w-[90px] px-0">
        Продолжить
      </Button>
    )
  }
  return null
}

// «Заказы пользователя …»: вкладки, поиск по трек-номеру, фильтр, сортируемая таблица (экраны 17, 18)
export function OrdersSection() {
  const user = useUserStore(selectUser)
  const { orders, isLoading, error, updateOrder } = useOrderStore()
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filter, setFilter] = useState(DEFAULT_ORDERS_FILTER)

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase()
    return filterOrders(orders, filter)
      .filter((order) => tab === 'all' || order.type === ORDER_TYPE.VIRTUAL)
      .filter((order) => !query || order.trackNumber.toLowerCase().includes(query))
      .map((order) => ({ ...order, amountValue: getOrderAmount(order) }))
  }, [orders, filter, tab, search])

  const { sorted, sort, toggleSort } = useSort(visibleOrders, { key: 'createdAt', direction: 'desc' })

  const header = (key, label) => (
    <SortableHeader sortKey={key} sort={sort} onSort={toggleSort}>
      {label}
    </SortableHeader>
  )

  return (
    <section id="orders" className="scroll-mt-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle>Заказы пользователя {getFullName(user)}</PageTitle>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" to={ROUTES.CABINET_VIRTUAL_ORDER} className="h-9">
            Добавить новый виртуальный заказ
          </Button>
          <Button size="sm" to={ROUTES.CABINET_ORDER_CHECKOUT} className="h-9">
            Добавить новый заказ
          </Button>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <Tabs tabs={TABS} value={tab} onChange={setTab} size="sm" className="w-full max-w-[196px]" />
        <div className="flex w-full items-center gap-6 sm:w-auto">
          <Input
            type="search"
            placeholder="Поиск по трек номеру"
            aria-label="Поиск по трек номеру"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            icon={<MagnifyingGlassIcon size={20} />}
            className="flex-1 sm:w-[315px] [&_input]:rounded-full"
          />
          <IconButton active={isFilterOpen} label="Фильтр" onClick={() => setIsFilterOpen((prev) => !prev)}>
            <FunnelIcon size={22} />
          </IconButton>
        </div>
      </div>

      {isFilterOpen && <OrdersFilter onApply={setFilter} onReset={() => setFilter(DEFAULT_ORDERS_FILTER)} />}

      <Table className="mt-8 max-h-[330px] overflow-y-auto">
        <thead className="sticky top-0 z-10">
          <tr>
            {header('createdAt', 'Дата')}
            {header('id', 'ID Заказа')}
            {header('trackNumber', 'Трек номер')}
            {header('shop', 'Магазин')}
            {header('weight', 'Вес')}
            {header('amountValue', 'Сумма')}
            {header('status', 'Статус')}
            {header('type', 'Выкуплен')}
            <Th>Комментарии</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {isLoading && <EmptyRow colSpan={10}>Загрузка...</EmptyRow>}
          {error && <EmptyRow colSpan={10}>{error}</EmptyRow>}
          {!isLoading && !error && sorted.length === 0 && <EmptyRow colSpan={10} />}
          {sorted.map((order) => (
            <Tr key={order.id}>
              <Td>{formatDate(order.createdAt)}</Td>
              <Td>{order.id}</Td>
              <Td>{order.trackNumber || '—'}</Td>
              <Td>{order.shop}</Td>
              <Td>{formatWeight(order.weight)}</Td>
              <Td>
                <span className="inline-flex items-center gap-1.5">
                  {formatMoney(order.amountValue)}
                  <Tooltip content={<AmountTooltip order={order} />} />
                </span>
              </Td>
              <Td>
                <OrderStatusIcon status={order.status} />
              </Td>
              <Td>
                {order.type === ORDER_TYPE.VIRTUAL ? (
                  <Tooltip content="Выкуплен вами самостоятельно">
                    <UserIcon size={18} />
                  </Tooltip>
                ) : (
                  <Tooltip content="Выкупает оператор OkeyPost">
                    <UserGearIcon size={18} />
                  </Tooltip>
                )}
              </Td>
              <Td>
                <Tooltip
                  content={order.comment || order.items.map((item) => item.comment).filter(Boolean).join('; ') || 'Нет комментария'}
                 
                >
                  <FileTextIcon size={18} />
                </Tooltip>
              </Td>
              <Td className="text-right">
                <OrderAction order={order} onPaid={() => updateOrder(order.id, { status: ORDER_STATUS.PROCESSING })} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}
