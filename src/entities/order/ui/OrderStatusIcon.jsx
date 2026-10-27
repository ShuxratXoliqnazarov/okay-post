import {
  CheckCircleIcon,
  ClockClockwiseIcon,
  CurrencyCircleDollarIcon,
  MapPinIcon,
  PackageIcon,
  PaperPlaneTiltIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react'
import { Tooltip } from '@/shared/ui'
import { ORDER_STATUS, ORDER_STATUS_LABEL } from '../model/constants'

// Иконка и цвет для каждого статуса (как в колонке «Статус» на экране 17)
const STATUS_ICON = {
  [ORDER_STATUS.DRAFT]: { Icon: PencilSimpleIcon, color: 'text-muted' },
  [ORDER_STATUS.AWAITING_PAYMENT]: { Icon: CurrencyCircleDollarIcon, color: 'text-warning' },
  [ORDER_STATUS.PROCESSING]: { Icon: ClockClockwiseIcon, color: 'text-muted' },
  [ORDER_STATUS.BOUGHT]: { Icon: CheckCircleIcon, color: 'text-primary' },
  [ORDER_STATUS.RECEIVED]: { Icon: MapPinIcon, color: 'text-accent' },
  [ORDER_STATUS.PACKED]: { Icon: PackageIcon, color: 'text-purple' },
  [ORDER_STATUS.SENT]: { Icon: PaperPlaneTiltIcon, color: 'text-primary' },
}

export function OrderStatusIcon({ status }) {
  const { Icon, color } = STATUS_ICON[status] ?? STATUS_ICON[ORDER_STATUS.PROCESSING]
  return (
    <Tooltip content={ORDER_STATUS_LABEL[status]}>
      <Icon size={18} className={color} aria-label={ORDER_STATUS_LABEL[status]} />
    </Tooltip>
  )
}
