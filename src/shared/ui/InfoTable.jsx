import { cn } from '@/shared/lib'

export function InfoTable({ rows, className }) {
  return (
    <dl className={cn('flex flex-col', className)}>
      {rows.map(({ label, value }, index) => (
        <div
          key={label}
          className={cn(
            'grid gap-1 rounded-md px-5 py-4 text-[15px] sm:grid-cols-[240px_1fr] sm:px-8',
            index % 2 === 0 && 'bg-surface',
          )}
        >
          <dt className="font-bold text-dark">{label}</dt>
          <dd className="font-light break-all text-dark">{value || '—'}</dd>
        </div>
      ))}
    </dl>
  )
}
