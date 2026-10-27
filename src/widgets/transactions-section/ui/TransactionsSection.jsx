import { useMemo, useState } from 'react'
import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { PARCEL_STATUS, useParcelStore } from '@/entities/parcel'
import {
  PAYMENT_METHOD_LABEL,
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_LABEL,
  TRANSACTION_TYPE_LABEL,
  TransactionStatusIcon,
  useTransactionStore,
} from '@/entities/transaction'
import { getFullName, selectUser, useUserStore } from '@/entities/user'
import { DEFAULT_TRANSACTIONS_FILTER, filterTransactions, TransactionsFilter } from '@/features/filter-transactions'
import { PayButton } from '@/features/pay'
import { TopUpBalanceButton } from '@/features/top-up-balance'
import { ROUTES } from '@/shared/config'
import { downloadTextFile, formatDate, formatMoney, useSort } from '@/shared/lib'
import { Button, EmptyRow, PageTitle, SortableHeader, Table, Td, Th, Tr } from '@/shared/ui'

// +£50.00 / -£22.50
const formatSigned = (amount) => `${amount > 0 ? '+' : amount < 0 ? '-' : ''}${formatMoney(Math.abs(amount))}`

function downloadInvoice(transaction, userName) {
  downloadTextFile(
    `okeypost-invoice-${transaction.id}.txt`,
    [
      'OkeyPost — счёт по транзакции',
      `Номер: ${transaction.id}`,
      `Клиент: ${userName}`,
      `Дата: ${formatDate(transaction.createdAt)}`,
      `Тип: ${TRANSACTION_TYPE_LABEL[transaction.type]}`,
      `Способ оплаты: ${PAYMENT_METHOD_LABEL[transaction.method] ?? transaction.method}`,
      `Описание: ${transaction.description}`,
      `Сумма: ${formatSigned(transaction.amount)}`,
      `Статус: ${TRANSACTION_STATUS_LABEL[transaction.status]}`,
    ].join('\n'),
  )
}

// «Транзакции пользователя …»: фильтр по датам и типу, таблица, скачивание счёта (экран 17)
export function TransactionsSection() {
  const user = useUserStore(selectUser)
  const { transactions, isLoading, error } = useTransactionStore()
  const updateParcel = useParcelStore((state) => state.updateParcel)
  const [filter, setFilter] = useState(DEFAULT_TRANSACTIONS_FILTER)

  const visibleTransactions = useMemo(() => filterTransactions(transactions, filter), [transactions, filter])
  const { sorted, sort, toggleSort } = useSort(visibleTransactions, { key: 'createdAt', direction: 'desc' })

  const header = (key, label) => (
    <SortableHeader sortKey={key} sort={sort} onSort={toggleSort}>
      {label}
    </SortableHeader>
  )

  return (
    <section id="transactions" className="scroll-mt-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle as="h2">Транзакции пользователя {getFullName(user)}</PageTitle>
        <div className="flex flex-wrap gap-2.5">
          <TopUpBalanceButton variant="outline" size="sm" className="h-9 w-[135px]" />
          <Button size="sm" to={ROUTES.CABINET_CREATE_PARCEL} className="h-9">
            Запрос на формирование посылки
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <TransactionsFilter onApply={setFilter} />
      </div>

      <Table className="mt-9">
        <thead>
          <tr>
            {header('createdAt', 'Дата:')}
            {header('method', 'Тип оплаты:')}
            {header('description', 'Описание транзакции:')}
            {header('amount', 'Зачисление:')}
            {header('cashback', 'Кешбэк:')}
            {header('status', 'Статус')}
            {header('balanceAfter', 'Остаток:')}
            <Th>Счет:</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {isLoading && <EmptyRow colSpan={9}>Загрузка...</EmptyRow>}
          {error && <EmptyRow colSpan={9}>{error}</EmptyRow>}
          {!isLoading && !error && sorted.length === 0 && <EmptyRow colSpan={9} />}
          {sorted.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{formatDate(transaction.createdAt)}</Td>
              <Td>{PAYMENT_METHOD_LABEL[transaction.method] ?? '—'}</Td>
              <Td>{transaction.description}</Td>
              <Td className={transaction.amount > 0 ? 'text-primary' : undefined}>{formatSigned(transaction.amount)}</Td>
              <Td>{formatMoney(transaction.cashback)}</Td>
              <Td>
                <TransactionStatusIcon status={transaction.status} />
              </Td>
              <Td>{formatMoney(transaction.balanceAfter)}</Td>
              <Td>
                <button
                  type="button"
                  aria-label="Скачать счёт"
                  title="Скачать счёт"
                  className="text-dark hover:text-primary"
                  onClick={() => downloadInvoice(transaction, getFullName(user))}
                >
                  <DownloadSimpleIcon size={18} />
                </button>
              </Td>
              <Td className="text-right">
                {transaction.status === TRANSACTION_STATUS.PENDING && (
                  <PayButton
                    amount={Math.abs(transaction.amount)}
                    description={transaction.description}
                    transactionId={transaction.id}
                    onPaid={() =>
                      transaction.parcelId && updateParcel(transaction.parcelId, { status: PARCEL_STATUS.FORMED })
                    }
                  />
                )}
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}
