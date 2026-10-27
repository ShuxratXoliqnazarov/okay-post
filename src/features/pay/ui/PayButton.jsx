import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PAYMENT_METHODS,
  PaymentMethodOption,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
  useTransactionStore,
} from '@/entities/transaction'
import { selectUser, useUserStore } from '@/entities/user'
import { formatMoney } from '@/shared/lib'
import { Alert, Button, Modal } from '@/shared/ui'
import { createPaymentSchema } from '../model/schema'

const CONTACT_EMAIL = 'info@okeypost.com'

export function PayButton({ amount, description, transactionId, onPaid, children = 'Оплатить' }) {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUserStore(selectUser)
  const { addTransaction, updateTransaction } = useTransactionStore()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPaymentSchema(amount)),
    defaultValues: { method: '' },
  })

  const close = () => {
    setIsOpen(false)
    setServerError('')
    reset()
  }

  const onSubmit = async ({ method }) => {
    try {
      if (transactionId) {
        await updateTransaction(transactionId, { status: TRANSACTION_STATUS.DONE, method })
      } else {
        await addTransaction({
          type: TRANSACTION_TYPE.PAYMENT,
          method,
          description,
          amount: -amount,
          cashback: 0,
          balanceAfter: user?.balance ?? 0,
          status: TRANSACTION_STATUS.DONE,
        })
      }
      await onPaid?.()
      close()
    } catch (error) {
      setServerError(error.message)
    }
  }

  const maxLimit = Math.max(...PAYMENT_METHODS.map((method) => method.limit))

  return (
    <>
      <Button variant="outline" size="sm" className="w-[90px] px-0" onClick={() => setIsOpen(true)}>
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={close} title="Выберите метод оплаты:">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
          <p className="text-sm">
            К оплате: <span className="font-bold text-primary">{formatMoney(amount)}</span>
          </p>

          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodOption key={method.value} method={method} {...register('method')} />
          ))}
          {errors.method && <span className="-mt-3 text-xs text-danger">{errors.method.message}</span>}

          <p className="text-[15px] font-bold">Для большего платежа - свяжитесь с нами</p>
          <Alert variant="error">{serverError}</Alert>

          <div className="flex flex-wrap gap-3">
            {amount <= maxLimit && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Оплата...' : 'Перейти к оплате'}
              </Button>
            )}
            <Button
              variant={amount <= maxLimit ? 'outline' : 'primary'}
              onClick={() => (window.location.href = `mailto:${CONTACT_EMAIL}`)}
            >
              Связаться с нами
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
