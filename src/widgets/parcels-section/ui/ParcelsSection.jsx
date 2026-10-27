import { useMemo, useState } from 'react'
import { FileTextIcon, FunnelIcon } from '@phosphor-icons/react'
import {
  getDeliveryLabel,
  getServiceLabel,
  PARCEL_STATUS,
  PARCEL_STATUS_LABEL,
  ParcelStatusIcon,
  useParcelStore,
} from '@/entities/parcel'
import { TRANSACTION_STATUS, useTransactionStore } from '@/entities/transaction'
import { getFullName, selectUser, useUserStore } from '@/entities/user'
import { PayButton } from '@/features/pay'
import { ROUTES } from '@/shared/config'
import { formatDate, formatMoney, formatWeight, pluralize, useSort } from '@/shared/lib'
import {
  Button,
  EmptyRow,
  IconButton,
  PageTitle,
  Select,
  SortableHeader,
  Table,
  Td,
  Th,
  Tooltip,
  TooltipRows,
  Tr,
} from '@/shared/ui'

const STATUS_OPTIONS = Object.entries(PARCEL_STATUS_LABEL).map(([value, label]) => ({ value, label }))

// «Посылки пользователя …»: таблица посылок, тултип с габаритами, оплата (экран 17)
export function ParcelsSection() {
  const user = useUserStore(selectUser)
  const { parcels, isLoading, error, updateParcel } = useParcelStore()
  const transactions = useTransactionStore((state) => state.transactions)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [status, setStatus] = useState('')

  const visibleParcels = useMemo(
    () => parcels.filter((parcel) => !status || parcel.status === status),
    [parcels, status],
  )
  const { sorted, sort, toggleSort } = useSort(visibleParcels, { key: 'createdAt', direction: 'desc' })

  // Если за посылку уже выставлен счёт — оплачиваем его, а не создаём новый
  const findPendingTransaction = (parcelId) =>
    transactions.find((item) => item.parcelId === parcelId && item.status === TRANSACTION_STATUS.PENDING)

  const header = (key, label) => (
    <SortableHeader sortKey={key} sort={sort} onSort={toggleSort}>
      {label}
    </SortableHeader>
  )

  return (
    <section id="parcels" className="scroll-mt-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle as="h2">Посылки пользователя {getFullName(user)}</PageTitle>
        <div className="flex items-center gap-5">
          <Button size="sm" to={ROUTES.CABINET_CREATE_PARCEL} className="h-9">
            Запрос на формирование посылки
          </Button>
          <IconButton active={isFilterOpen} label="Фильтр" onClick={() => setIsFilterOpen((prev) => !prev)}>
            <FunnelIcon size={22} />
          </IconButton>
        </div>
      </div>

      {isFilterOpen && (
        <div className="mt-6 flex items-center gap-6">
          <Select
            aria-label="Статус посылки"
            options={STATUS_OPTIONS}
            placeholder="Все статусы"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full sm:w-[320px]"
          />
          {status && (
            <Button variant="link" className="text-xs font-bold no-underline" onClick={() => setStatus('')}>
              Сбросить
            </Button>
          )}
        </div>
      )}

      <Table className="mt-8">
        <thead>
          <tr>
            {header('createdAt', 'Дата')}
            {header('trackNumber', 'Трек номер')}
            {header('deliveryMethod', 'Доставка')}
            {header('recipientName', 'ФИО')}
            <Th>Параметры груза</Th>
            {header('actualWeight', 'Вес')}
            {header('cost', 'Сумма')}
            {header('status', 'Статус')}
            <Th>Дополнительные услуги</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {isLoading && <EmptyRow colSpan={10}>Загрузка...</EmptyRow>}
          {error && <EmptyRow colSpan={10}>{error}</EmptyRow>}
          {!isLoading && !error && sorted.length === 0 && <EmptyRow colSpan={10} />}
          {sorted.map((parcel) => {
            const pendingTransaction = findPendingTransaction(parcel.id)
            return (
              <Tr key={parcel.id}>
                <Td>{formatDate(parcel.createdAt)}</Td>
                <Td>{parcel.trackNumber || '—'}</Td>
                <Td>{getDeliveryLabel(parcel.deliveryMethod)}</Td>
                <Td>{parcel.recipientName || 'Не выбран'}</Td>
                <Td>
                  <span className="inline-flex items-center gap-1.5">
                    {parcel.orderIds.length} {pluralize(parcel.orderIds.length, ['заказ', 'заказа', 'заказов'])}
                    <Tooltip content={`Заказы: ${parcel.orderIds.map((id) => `ID ${id}`).join(', ')}`} />
                  </span>
                </Td>
                <Td>
                  <span className="inline-flex items-center gap-1.5">
                    {formatWeight(parcel.totalWeight ?? parcel.actualWeight)}
                    <Tooltip
                      content={
                        <TooltipRows
                          rows={[
                            { label: 'Фактический вес:', value: formatWeight(parcel.actualWeight) },
                            { label: 'Объемы посылки:', value: parcel.dimensions || '—' },
                            { label: 'Итоговый вес:', value: formatWeight(parcel.totalWeight) },
                          ]}
                        />
                      }
                    />
                  </span>
                </Td>
                <Td>{parcel.cost ? formatMoney(parcel.cost) : 'Рассчитывается'}</Td>
                <Td>
                  <ParcelStatusIcon status={parcel.status} />
                </Td>
                <Td>
                  <Tooltip
                    content={parcel.services.length ? parcel.services.map(getServiceLabel).join(', ') : 'Без доп. услуг'}
                   
                  >
                    <FileTextIcon size={18} />
                  </Tooltip>
                </Td>
                <Td className="text-right">
                  {parcel.status === PARCEL_STATUS.AWAITING_PAYMENT && (
                    <PayButton
                      amount={parcel.cost}
                      description={`Оплата за посылку ID ${parcel.id}`}
                      transactionId={pendingTransaction?.id}
                      onPaid={() => updateParcel(parcel.id, { status: PARCEL_STATUS.FORMED })}
                    />
                  )}
                </Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </section>
  )
}
