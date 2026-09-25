import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Info } from 'lucide-react'
import Section, { SectionHeading } from './Section'
import { CONCEPT_NOTICE, HOW_IT_WORKS, PILLARS, type ImageCard } from '../data/focus'
import { EFFICACY } from '../data/investor'

/** Hero shared by the three focus pages: copy on the left, image on the right. */
export function FocusHero({
  eyebrow,
  title,
  lede,
  image,
  alt,
  children,
}: {
  eyebrow: string
  title: string
  lede: string
  image: string
  alt: string
  children?: ReactNode
}) {
  return (
    <section className="bg-white pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">{eyebrow}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight text-blue-500 uppercase text-balance">
            {title}
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-measure leading-relaxed">{lede}</p>
          {children && <div className="mt-8 flex flex-col sm:flex-row gap-3">{children}</div>}
        </div>
        <img
          src={image}
          alt={alt}
          width={1600}
          height={893}
          className="w-full rounded-2xl shadow-lg object-cover aspect-[16/10]"
        />
      </div>
    </section>
  )
}

export function PrimaryLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 font-display font-medium bg-blue-600 text-white px-7 py-3 rounded-md hover:bg-blue-700 transition-colors"
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  )
}

export function SecondaryLink({ to, children }: { to: string; children: ReactNode }) {
  const cls =
    'inline-flex items-center justify-center font-display font-medium border border-gray-300 text-gray-700 px-7 py-3 rounded-md hover:border-gray-400 hover:text-gray-900 transition-colors'
  return to.startsWith('#') ? (
    <a href={to} className={cls}>
      {children}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}

/** Uniqueness, patent, purification diversity. */
export function Pillars({
  id = 'why-hydrgel',
  tone = 'sunken',
  title = 'Why HYDRGEL is different',
}: {
  id?: string
  tone?: 'white' | 'sunken'
  title?: string
}) {
  return (
    <Section id={id} tone={tone}>
      <SectionHeading eyebrow="The technology" title={title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map(({ id: key, Icon, eyebrow, title: heading, body, points }) => (
          <article key={key} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 flex flex-col">
            <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-green-700">{eyebrow}</p>
            <h3 className="mt-1 text-xl font-semibold text-gray-900">{heading}</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">{body}</p>
            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              {points.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-700 flex-shrink-0" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

/** Fill, treat, drink, beside the exploded pouch schematic. */
export function HowItWorks({ tone = 'white' }: { tone?: 'white' | 'sunken' }) {
  return (
    <Section id="how-it-works" tone={tone}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <img
          src="/images/focus/how-it-works.webp"
          alt="Exploded view of the HYDRGEL pouch: tap connector, hydrogel sachet, carbon granules and drinking spout"
          width={1600}
          height={1600}
          loading="lazy"
          className="w-full max-w-lg mx-auto rounded-2xl"
        />
        <div>
          <SectionHeading eyebrow="How it works" title="Clean water in three steps" />
          <ol className="space-y-6">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.step} className="flex gap-4">
                <span className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 text-white font-display font-semibold flex items-center justify-center">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-gray-600 mt-1">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

/** The bacteria results, the one performance claim with lab evidence behind it. */
export function EfficacyTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Laboratory results before and after treatment</caption>
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">Bacteria tested</th>
            <th scope="col" className="px-5 py-3 font-semibold">Before</th>
            <th scope="col" className="px-5 py-3 font-semibold">After</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {EFFICACY.map((r) => (
            <tr key={r.test}>
              <th scope="row" className="px-5 py-3 font-medium text-gray-900">{r.test}</th>
              <td className="px-5 py-3 text-gray-600 tabular-nums">{r.before}</td>
              <td className="px-5 py-3 text-green-700 font-semibold tabular-nums">{r.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-5 py-3 text-xs text-gray-600 border-t border-gray-200">
        Laboratory test reports, October 2020. Other contaminants are in development and subject to testing.
      </p>
    </div>
  )
}

export function ImageGrid({ items, cols = 3 }: { items: ImageCard[]; cols?: 3 | 6 }) {
  const grid = cols === 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-3'
  return (
    <div className={`grid ${grid} gap-4 md:gap-6`}>
      {items.map((i) => (
        <figure key={i.src} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
          <img
            src={i.src}
            alt={i.alt}
            width={800}
            height={993}
            loading="lazy"
            className="w-full aspect-[4/5] object-cover"
          />
          <figcaption className="px-4 py-3 text-sm font-medium text-gray-700">{i.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function ConceptNote() {
  return (
    <p className="mt-6 flex gap-2 text-xs text-gray-600 max-w-3xl">
      <Info className="h-4 w-4 flex-shrink-0 mt-px" aria-hidden="true" />
      <span>{CONCEPT_NOTICE}</span>
    </p>
  )
}

/** Closing call to action on each focus page. */
export function FocusCta({
  title,
  body,
  cta,
  to = '/contact',
}: {
  title: string
  body: string
  cta: string
  to?: string
}) {
  return (
    <section className="bg-blue-600 text-white py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-balance">{title}</h2>
        <p className="mt-4 text-blue-50 text-lg">{body}</p>
        <Link
          to={to}
          className="mt-8 inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-blue-600 px-7 py-3 rounded-md hover:bg-gray-100 transition-colors"
        >
          {cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
