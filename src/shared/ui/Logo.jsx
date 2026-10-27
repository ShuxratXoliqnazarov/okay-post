import { Link } from 'react-router-dom'
import logo from '@/shared/assets/images/logo.svg'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'

export function Logo({ className }) {
  return (
    <Link to={ROUTES.HOME} className={cn('inline-flex shrink-0', className)}>
      <img src={logo} alt="OkeyPost" width={190} height={48} className="h-9 w-auto sm:h-12" />
    </Link>
  )
}
