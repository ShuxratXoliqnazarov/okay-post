import { ChatTextIcon, PhoneCallIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { Container, GradientBanner } from '@/shared/ui'

const socials = [
  { label: 'WhatsApp', Icon: WhatsappLogoIcon },
  { label: 'Viber', Icon: PhoneCallIcon },
  { label: 'Чат', Icon: ChatTextIcon },
]

// Баннер «Остались вопросы? Спросите нас в соцсетях!» перед футером
export function SocialBanner() {
  return (
    <GradientBanner>
      <Container className="flex max-w-[1448px] flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-[100px]">
        <h2 className="text-[26px] leading-tight font-extrabold sm:text-3xl lg:text-[40px]">Остались вопросы? Спросите нас в соцсетях!</h2>

        <div className="flex shrink-0 gap-2.5">
          {socials.map(({ label, Icon }) => (
            <a
              key={label}
              href="#contacts"
              aria-label={label}
              className="flex size-[66px] items-center justify-center rounded-full border border-white/90 transition hover:bg-white/15"
            >
              <Icon size={30} />
            </a>
          ))}
        </div>
      </Container>
    </GradientBanner>
  )
}
