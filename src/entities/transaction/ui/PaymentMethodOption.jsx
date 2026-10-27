import { PaymentLogo, Radio } from '@/shared/ui'

/*
  Вариант оплаты в модалке (экран 18): радио + логотип + название + лимит.
    {PAYMENT_METHODS.map((method) => (
      <PaymentMethodOption key={method.value} method={method} {...register('method')} />
    ))}
*/
export function PaymentMethodOption({ method, ref, ...props }) {
  return (
    <Radio ref={ref} value={method.value} {...props}>
      <PaymentLogo type={method.value} />
      <span className="mt-3 block text-[15px] font-bold">{method.label}</span>
      <span className="mt-1 block text-[13px] font-light text-dark">
        максимальная сумма платежа
        <br />
        за раз {method.limit} фунтов
      </span>
    </Radio>
  )
}
