import {
  CheckCircleIcon,
  ClockClockwiseIcon,
  CurrencyCircleDollarIcon,
  PaperPlaneRightIcon,
  PaperPlaneTiltIcon,
} from '@phosphor-icons/react'
import { Tooltip } from '@/shared/ui'
import { PARCEL_STATUS, PARCEL_STATUS_LABEL } from '../model/constants'

const STATUS_ICON = {
  [PARCEL_STATUS.REQUESTED]: { Icon: PaperPlaneRightIcon, color: 'text-accent' },
  [PARCEL_STATUS.PROCESSING]: { Icon: ClockClockwiseIcon, color: 'text-muted' },
  [PARCEL_STATUS.AWAITING_PAYMENT]: { Icon: CurrencyCircleDollarIcon, color: 'text-warning' },
  [PARCEL_STATUS.FORMED]: { Icon: CheckCircleIcon, color: 'text-primary' },
  [PARCEL_STATUS.SENT]: { Icon: PaperPlaneTiltIcon, color: 'text-primary' },
}

export function ParcelStatusIcon({ status }) {
  const { Icon, color } = STATUS_ICON[status] ?? STATUS_ICON[PARCEL_STATUS.PROCESSING]
  return (
    <Tooltip content={PARCEL_STATUS_LABEL[status]}>
      <Icon size={18} className={color} aria-label={PARCEL_STATUS_LABEL[status]} />
    </Tooltip>
  )
}
