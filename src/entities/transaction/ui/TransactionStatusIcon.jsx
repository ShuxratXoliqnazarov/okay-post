import { CheckCircleIcon, ClockClockwiseIcon } from '@phosphor-icons/react'
import { Tooltip } from '@/shared/ui'
import { TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL } from '../model/constants'

export function TransactionStatusIcon({ status }) {
  const isDone = status === TRANSACTION_STATUS.DONE
  const Icon = isDone ? CheckCircleIcon : ClockClockwiseIcon
  return (
    <Tooltip content={TRANSACTION_STATUS_LABEL[status]}>
      <Icon
        size={18}
        className={isDone ? 'text-primary' : 'text-muted'}
        aria-label={TRANSACTION_STATUS_LABEL[status]}
      />
    </Tooltip>
  )
}
