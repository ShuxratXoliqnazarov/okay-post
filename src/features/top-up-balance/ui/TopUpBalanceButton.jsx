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
import { userApi, useUserStore } from '@/entities/user'
import { Alert, Button, Input, Modal } from '@/shared/ui'
import { topUpSchema } from '../model/schema'

export function TopUpBalanceButton({ variant = 'primary', size = 'sm', className, children = 'Пополнить счет' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [serverError, setServerError] = useState('')
  const setUser = useUserStore((state) => state.setUser)
  const addTransaction = useTransactionStore((state) => state.addTransaction)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(topUpSchema),
    mode: 'onTouched',
    defaultValues: { amount: '', method: '' },
  })

  const close = () => {
    setIsOpen(false)
    setServerError('')
    reset()
  }

  const onSubmit = async ({ amount, method }) => {
    try {
      const user = await userApi.changeBalance(amount)
      setUser(user)
      await addTransaction({
        type: TRANSACTION_TYPE.DEPOSIT,
        method,
        description: 'Пополнение баланса',
        amount,
        cashback: 0,
        balanceAfter: user.balance,
        status: TRANSACTION_STATUS.DONE,
      })
      close()
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setIsOpen(true)}>
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={close} title="Пополнение баланса">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
          <Input
            label="Сумма, £:"
            inputMode="decimal"
            placeholder="Только цифры"
            {...register('amount')}
            error={errors.amount?.message}
          />

          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodOption key={method.value} method={method} {...register('method')} />
          ))}
          {errors.method && <span className="-mt-3 text-xs text-danger">{errors.method.message}</span>}

          <Alert variant="error">{serverError}</Alert>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Пополнение...' : 'Пополнить'}
          </Button>
        </form>
      </Modal>
    </>
  )
}
