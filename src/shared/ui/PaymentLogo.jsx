import paypalLogo from '@/shared/assets/images/paypal.png'
import cardsLogo from '@/shared/assets/images/visa-mastercard.png'
import { cn } from '@/shared/lib'

const LOGOS = {
  paypal: { src: paypalLogo, alt: 'PayPal', className: 'h-[27px]' },
  card: { src: cardsLogo, alt: 'Visa / Mastercard', className: 'h-[26px]' },
}

export function PaymentLogo({ type, framed, className }) {
  const logo = LOGOS[type]
  const image = <img src={logo.src} alt={logo.alt} className={cn('w-auto', logo.className)} />

  if (!framed) return <span className={cn('inline-flex', className)}>{image}</span>

  return (
    <span
      className={cn(
        'inline-flex h-12 items-center justify-center rounded-full bg-white px-4 shadow-card',
        className,
      )}
    >
      {image}
    </span>
  )
}
