import { WhatsappLogo, TelegramLogo, ChatCircleDots } from '@phosphor-icons/react'
import { Container } from '@/shared/ui'
import { cn } from '@/shared/lib'

export function SocialBanner({ className }) {
  return (
    <Container className={cn('my-12 sm:my-16', className)}>
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#5B52A3] via-[#4884C6] to-[#41B7E9] px-8 py-9 text-white shadow-[0_12px_36px_rgba(91,82,163,0.2)] sm:rounded-[30px] sm:px-12 sm:py-11">
        {/* Фоновые световые акценты */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-[#00c97b]/20 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-[28px]">
            Остались вопросы? Спросите нас в соцсетях!
          </h2>

          <div className="flex items-center gap-3.5">
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-[#25D366] hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)] active:scale-95"
            >
              <WhatsappLogo size={24} weight="fill" />
            </a>

            <a
              href="https://viber.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Viber"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-[#7360F2] hover:shadow-[0_4px_20px_rgba(115,96,242,0.4)] active:scale-95"
            >
              <ChatCircleDots size={24} weight="fill" />
            </a>

            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-[#0088cc] hover:shadow-[0_4px_20px_rgba(0,136,204,0.4)] active:scale-95"
            >
              <TelegramLogo size={24} weight="fill" />
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
