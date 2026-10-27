import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { InfoIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

const TOOLTIP_WIDTH = 280

export function Tooltip({ content, className, children }) {
  const triggerRef = useRef(null)
  const [position, setPosition] = useState(null)

  const show = () => {
    const rect = triggerRef.current.getBoundingClientRect()
    const fitsRight = rect.left + TOOLTIP_WIDTH < window.innerWidth
    setPosition(
      fitsRight
        ? { top: rect.bottom + 8, left: rect.left }
        : { top: rect.bottom + 8, right: window.innerWidth - rect.right },
    )
  }
  const hide = () => setPosition(null)

  // при скролле прячем
  useEffect(() => {
    if (!position) return
    window.addEventListener('scroll', hide, true)
    return () => window.removeEventListener('scroll', hide, true)
  }, [position])

  return (
    <span
      ref={triggerRef}
      tabIndex={0}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className={cn('inline-flex cursor-help align-middle outline-none', className)}
    >
      {children ?? <InfoIcon size={16} weight="fill" className="text-muted/50" />}
      {position &&
        createPortal(
          <span
            role="tooltip"
            style={{ position: 'fixed', maxWidth: TOOLTIP_WIDTH, ...position }}
            className="pointer-events-none z-[60] w-max rounded-lg bg-white p-4 text-left text-xs font-normal whitespace-normal text-dark shadow-card"
          >
            {content}
          </span>,
          document.body,
        )}
    </span>
  )
}

export function TooltipRows({ rows }) {
  return (
    <span className="grid grid-cols-[auto_auto] gap-x-6 gap-y-2">
      {rows.map(({ label, value }) => (
        <span key={label} className="contents">
          <span className="font-bold">{label}</span>
          <span>{value}</span>
        </span>
      ))}
    </span>
  )
}
