import { useState } from 'react'
import { CaretDownIcon, WarningIcon, XIcon } from '@phosphor-icons/react'
import { NOTIFICATION_TYPE, useNotificationStore } from '@/entities/notification'
import { ROUTES } from '@/shared/config'
import { cn, formatDayMonth } from '@/shared/lib'
import { Button, Card, PageTitle } from '@/shared/ui'

function NotificationCard({ notification, onOpen, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isWarning = notification.type === NOTIFICATION_TYPE.WARNING

  const toggle = () => {
    setIsExpanded((prev) => !prev)
    if (!notification.isRead) onOpen(notification.id)
  }

  return (
    <Card as="article" className={cn('relative flex gap-6 p-7 pr-16', isWarning && 'lg:row-span-2')}>
      {isWarning && <WarningIcon size={40} className="shrink-0 text-accent" />}

      <div className="flex flex-1 flex-col gap-3">
        <h2 className="flex items-start gap-2 text-lg font-bold">
          {!notification.isRead && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-label="Новое" />}
          {notification.title}
        </h2>
        <p className={cn('text-sm leading-[24px]', !isExpanded && !isWarning && 'line-clamp-2')}>{notification.text}</p>
        {isWarning ? (
          <Button size="sm" to={ROUTES.PRICES} className="mt-3 w-[128px]">
            Посчитать
          </Button>
        ) : (
          <time dateTime={notification.createdAt} className="text-[13px] font-light text-muted capitalize">
            {formatDayMonth(notification.createdAt)}
          </time>
        )}
      </div>

      <button
        type="button"
        aria-label="Удалить уведомление"
        onClick={() => onRemove(notification.id)}
        className="absolute top-4 right-4 text-muted/60 hover:text-danger"
      >
        <XIcon size={16} />
      </button>
      {!isWarning && (
        <button
          type="button"
          aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
          aria-expanded={isExpanded}
          onClick={toggle}
          className="absolute top-1/2 right-6 -translate-y-1/2 text-primary"
        >
          <CaretDownIcon size={28} className={cn('transition-transform', isExpanded && 'rotate-180')} />
        </button>
      )}
    </Card>
  )
}

// макет: 25_Уведомления
export function NotificationsPage() {
  const { notifications, isLoading, updateNotification, removeNotification } = useNotificationStore()

  return (
    <>
      <PageTitle className="mb-6">Уведомления</PageTitle>
      {isLoading && notifications.length === 0 && <p className="text-muted">Загрузка...</p>}
      {!isLoading && notifications.length === 0 && <p className="font-light">Уведомлений нет</p>}

      <div className="grid items-start gap-6 lg:grid-cols-2">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onOpen={(id) => updateNotification(id, { isRead: true })}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </>
  )
}
