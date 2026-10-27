import { cn } from '@/shared/lib'

/*
  Вкладки с зелёным подчёркиванием активной.
    <Tabs tabs={[{ value: 'all', label: 'Все' }]} value={tab} onChange={setTab} />
*/
export function Tabs({ tabs, value, onChange, size = 'lg', className }) {
  return (
    <div className={cn('flex overflow-x-auto border-b border-dark/40', className)} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              '-mb-px shrink-0 border-b-2 font-bold whitespace-nowrap transition-colors',
              size === 'lg' ? 'px-0 pb-6 text-lg not-last:mr-14 sm:text-xl' : 'pb-8 text-[15px] not-last:mr-14',
              isActive ? 'border-primary text-primary' : 'border-transparent text-dark hover:text-primary',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
