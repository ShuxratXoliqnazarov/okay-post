import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from '@phosphor-icons/react'
import { cn } from '@/shared/lib'

/*
  Модальное окно поверх затемнённой страницы.
  Закрывается по крестику, Esc и клику по подложке.
    const [isOpen, setIsOpen] = useState(false)
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Выберите метод оплаты:">...</Modal>
*/
export function Modal({ isOpen, onClose, title, className, children }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-dark/40 px-4 py-16 sm:py-24"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn('relative w-full max-w-[360px] rounded-2xl bg-white p-8 shadow-card', className)}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3 right-3 text-dark transition hover:text-primary sm:-top-10 sm:-right-10 sm:text-white"
        >
          <XIcon size={32} />
        </button>
        {title && <h2 className="mb-5 pr-8 text-xl font-bold text-dark sm:pr-0">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  )
}
