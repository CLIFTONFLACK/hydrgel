import type { ReactNode } from 'react'
import Container from './Container'

type Tone = 'white' | 'sunken' | 'brand'
type Space = 'normal' | 'loose' | 'tight'

const TONES: Record<Tone, string> = {
  white: 'bg-white',
  sunken: 'bg-gray-50',
  brand: 'bg-blue-600 text-white',
}

/**
 * Vertical rhythm lives here rather than in each page. Everything used to be
 * `py-16`, which gave a hero the same weight as a dense card grid and
 * flattened the page hierarchy.
 */
const SPACE: Record<Space, string> = {
  tight: 'py-12 md:py-16',
  normal: 'py-16 md:py-24',
  loose: 'py-20 md:py-28',
}

export default function Section({
  children,
  id,
  tone = 'white',
  space = 'normal',
  width = 'wide',
  className = '',
}: {
  children: ReactNode
  id?: string
  tone?: Tone
  space?: Space
  width?: 'wide' | 'text'
  className?: string
}) {
  return (
    <section id={id} className={`${TONES[tone]} ${SPACE[space]} ${className}`}>
      <Container width={width}>{children}</Container>
    </section>
  )
}

/** Consistent eyebrow + heading pair, used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string
  title: string
  lede?: string
}) {
  return (
    <div className="mb-10 md:mb-12">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mt-2 tracking-tight text-balance">
        {title}
      </h2>
      {lede && <p className="mt-4 text-lg text-gray-600 max-w-2xl leading-relaxed">{lede}</p>}
    </div>
  )
}
