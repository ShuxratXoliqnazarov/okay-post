import { useEffect, useState } from 'react'

const londonFormatter = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/London',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

// Текущее время в Лондоне, обновляется каждую секунду: "19 : 10 : 36"
export function useLondonTime() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return londonFormatter.format(time).replaceAll(':', ' : ')
}
