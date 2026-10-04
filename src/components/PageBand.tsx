import type { ReactNode } from 'react'
import { AccentTitle } from './Focus'

/**
 * Short dark hero for pages that lead with text, not a photograph (Team,
 * Contact, News). It matches the dark image heroes in colour and type, with a
 * soft cyan glow in place of a picture, so every page opens the same way.
 */
export default function PageBand({
  eyebrow,
  title,
  accent,
  subtitle,
  lede,
  children,
}: {
  eyebrow?: string
  title: string
  /** The part of `title` to pick out in cyan. */
  accent?: string
  /** A line under the title, for pages that have one. */
  subtitle?: string
  lede: string
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white pt-28 pb-14 md:pt-32 md:pb-16">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_120%_at_88%_0%,rgba(34,211,238,0.16),transparent_62%),radial-gradient(40%_90%_at_100%_100%,rgba(37,99,235,0.18),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl motion-safe:animate-rise">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          )}
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight uppercase text-balance">
            <AccentTitle title={title} accent={accent} />
          </h1>
          {subtitle && <h2 className="mt-4 text-xl md:text-2xl text-cyan-300">{subtitle}</h2>}
          <p className="mt-6 text-lg text-slate-200 leading-relaxed max-w-2xl">{lede}</p>
          {children && <div className="mt-8 flex flex-col sm:flex-row gap-3">{children}</div>}
        </div>
      </div>
    </section>
  )
}
