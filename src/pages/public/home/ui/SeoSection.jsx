import { Container } from '@/shared/ui'
import { SEO_PARAGRAPHS } from '../model/content'

// Текстовый блок про личный адрес в Великобритании
export function SeoSection() {
  return (
    <Container className="max-w-[1448px]">
      <h2 className="text-[26px] leading-snug font-extrabold sm:text-4xl lg:text-[40px]">Ваш личный адрес в Великобритании для покупок</h2>
      <div className="mt-6 flex flex-col gap-4 text-base leading-8 font-light sm:text-lg sm:leading-9">
        {SEO_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </Container>
  )
}
