// Форматирование данных для вывода в UI

// '2026-10-01T10:00:00.000Z' -> '01.10.2026'
export const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString('ru-RU') : '—')

// '2026-10-01T10:00:00.000Z' -> '1 октября'
export const formatDayMonth = (iso) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

// 568 -> '£568.00'
export const formatMoney = (value) => `£${Number(value ?? 0).toFixed(2)}`

// 1.5 -> '1.5 kg', 0 -> '—'
export const formatWeight = (kg) => (kg ? `${kg} kg` : '—')

// pluralize(5, ['заказ', 'заказа', 'заказов']) -> 'заказов'
export function pluralize(count, [one, few, many]) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}
