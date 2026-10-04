import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import Section, { SectionHeading } from './Section'
import {
  CONCEPT_NOTICE,
  HOW_IT_WORKS,
  PILLARS,
  PROOF_POINTS,
  type ImageCard,
} from '../data/focus'
import { EFFICACY, PARTNERS } from '../data/investor'
import { useInView } from '../hooks/useInView'

type HeroFact = { value: string; label: string }

type FocusHeroProps = {
  eyebrow: string
  title: string
  lede: string
  image: string
  alt: string
  /** Caption under the image, for imagery that could be read as a real deployment. */
  imageNote?: string
  /** `dark` is the full-bleed version that matches the home hero. */
  tone?: 'light' | 'dark'
  /** Dark only: the part of `title` to pick out in cyan. Ignored if the title does not contain it. */
  accent?: string
  /** Dark only: short checkable facts along the bottom edge. */
  facts?: HeroFact[]
  /** Dark only: how far down the photo to centre the crop, in percent. 0 keeps the top edge. Default 50 on phones, 40 from lg. */
  focalY?: number
  /** Dark only: a shorter hero for pages that carry more content below it. */
  compact?: boolean
  children?: ReactNode
}

/** A title with one phrase picked out in cyan; the plain title if `accent` is absent or not in it. */
export function AccentTitle({ title, accent }: { title: string; accent?: string }) {
  const at = accent ? title.indexOf(accent) : -1
  if (!accent || at < 0) return <>{title}</>
  return (
    <>
      {title.slice(0, at)}
      <span className="text-cyan-300">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  )
}

/** Hero shared by the focus and company pages: copy on the left, image on the right. */
export function FocusHero(props: FocusHeroProps) {
  if (props.tone === 'dark') return <DarkFocusHero {...props} />
  const { eyebrow, title, lede, image, alt, imageNote, children } = props
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
        <figure>
          <img
            src={image}
            alt={alt}
            width={1600}
            height={893}
            className="w-full rounded-2xl shadow-lg object-cover aspect-[16/10]"
          />
          {imageNote && <figcaption className="mt-3 text-xs text-gray-600">{imageNote}</figcaption>}
        </figure>
      </div>
    </section>
  )
}

/**
 * Phones and tablets: the photo is a 16:9 band under the nav with the copy
 * below it, as on the home hero, so the text never covers a face. From lg up
 * the photo fills the right two-thirds and fades into the navy behind the copy.
 */
function DarkFocusHero({
  eyebrow,
  title,
  lede,
  image,
  alt,
  imageNote,
  accent,
  facts,
  focalY,
  compact,
  children,
}: FocusHeroProps) {
  // A custom property, because the crop's x position differs by breakpoint and its y position does not.
  const focal = focalY === undefined ? undefined : ({ '--fy': `${focalY}%` } as CSSProperties)
  return (
    <section
      className={`relative isolate overflow-hidden bg-slate-950 text-white lg:flex lg:flex-col ${
        compact ? 'lg:min-h-[min(62vh,600px)]' : 'lg:min-h-[min(78vh,760px)]'
      }`}
    >
      <div className="relative mt-16 aspect-video lg:mt-0 lg:aspect-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[64%] lg:-z-10">
        <img
          src={image}
          alt={alt}
          width={1600}
          height={893}
          style={focal}
          className="h-full w-full object-cover [object-position:50%_var(--fy,50%)] lg:[object-position:100%_var(--fy,40%)]"
        />
        {/* -left-px: the photo's left edge lands on a fractional pixel and shows as a seam otherwise. */}
        <div
          className="absolute inset-0 lg:-left-px bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-[linear-gradient(90deg,#020617_6%,rgba(2,6,23,0.88)_25%,rgba(2,6,23,0.2)_53%,transparent)]"
          aria-hidden="true"
        />
        {imageNote && (
          // From lg the bottom edge sits behind the facts strip, so the note moves up under the nav.
          <p className="absolute bottom-3 right-3 lg:bottom-auto lg:top-20 max-w-[90%] rounded bg-slate-950/70 px-2 py-1 text-xs text-slate-200">
            {imageNote}
          </p>
        )}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:flex-1 lg:flex lg:items-center lg:pt-32 lg:pb-16">
        <div className="max-w-xl motion-safe:animate-rise">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight uppercase text-balance">
            <AccentTitle title={title} accent={accent} />
          </h1>
          <p className="mt-6 text-lg text-slate-200 leading-relaxed max-w-measure">{lede}</p>
          {children && <div className="mt-8 flex flex-col sm:flex-row gap-3">{children}</div>}
        </div>
      </div>

      {facts && facts.length > 0 && (
        <div className="border-t border-white/15 bg-slate-950/60 backdrop-blur-sm">
          <dl className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5">
            {facts.map((f) => (
              // Same reversal as ProofStrip: value reads first, term stays first in the markup.
              <div key={f.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-sm text-slate-300 leading-snug">{f.label}</dt>
                <dd className="font-display text-lg md:text-xl font-bold text-cyan-300">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  )
}

/** The checkable facts, in one row directly under the home hero. */
export function ProofStrip() {
  return (
    <section aria-label="Key facts" className="bg-slate-950 text-white border-t border-white/10">
      <dl className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {PROOF_POINTS.map((p) => (
          // Reversed so the value reads first while the term stays first in
          // the markup; justify-end keeps every value on the top line.
          <div key={p.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-1 text-sm text-slate-300 leading-snug">{p.label}</dt>
            <dd className="font-display text-lg md:text-xl font-bold text-cyan-300 tabular-nums">
              {p.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/** Pilot partners, by sector and geography only. */
export function PilotGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {PARTNERS.map((p) => (
        <div key={p.sector} className="bg-white rounded-2xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-700">{p.geography}</p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">{p.sector}</h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.body}</p>
        </div>
      ))}
    </div>
  )
}

/** `onDark` restyles the link for a dark hero, matching the home hero's buttons. */
type HeroLinkProps = { to: string; onDark?: boolean; children: ReactNode }

export function PrimaryLink({ to, onDark, children }: HeroLinkProps) {
  const cls = `inline-flex items-center justify-center gap-2 font-display px-7 py-3 rounded-md transition-colors ${
    onDark
      ? 'font-semibold whitespace-nowrap bg-white text-slate-950 hover:bg-cyan-100'
      : 'font-medium bg-blue-600 text-white hover:bg-blue-700'
  }`
  const body = (
    <>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </>
  )
  // A same-page anchor stays a plain <a>, so the browser scrolls on every click. A router
  // Link to the same hash changes nothing the second time, and the button looks dead.
  return to.startsWith('#') ? (
    <a href={to} className={cls}>
      {body}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {body}
    </Link>
  )
}

export function SecondaryLink({ to, onDark, children }: HeroLinkProps) {
  const cls = `inline-flex items-center justify-center font-display font-medium border px-7 py-3 rounded-md transition-colors ${
    onDark
      ? 'whitespace-nowrap border-white/40 text-white hover:bg-white/10'
      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
  }`
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

/**
 * Uniqueness, patent, purification diversity.
 *
 * The home page shows them as animated slogans. The market pages use
 * `compact`, which states the three points plainly and links back to the home
 * section.
 */
export function Pillars({
  id = 'why-hydrgel',
  tone = 'sunken',
  title = 'Why HYDRGEL is different',
  compact = false,
  image,
}: {
  id?: string
  tone?: 'white' | 'sunken'
  title?: string
  compact?: boolean
  /** Compact only: a picture beside the three points, which then stack. */
  image?: { src: string; alt: string; width: number; height: number }
}) {
  if (compact) {
    const points = (
      <>
        <ul className={`grid grid-cols-1 gap-6 ${image ? '' : 'md:grid-cols-3'}`}>
          {PILLARS.map(({ id: key, Icon, eyebrow, title: heading }) => (
            <li key={key} className="flex items-start gap-4">
              <span className="h-11 w-11 flex-shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">{eyebrow}</p>
                <p className="mt-1 font-semibold text-gray-900">{heading}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link
          to="/#why-hydrgel"
          className="mt-8 inline-flex items-center gap-2 font-display font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Why HYDRGEL is different
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </>
    )
    return (
      <Section id={id} tone={tone} space="tight">
        <SectionHeading eyebrow="The technology" title={title} />
        {image ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>{points}</div>
            <figure>
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="w-full rounded-2xl border border-gray-200"
              />
              <figcaption className="mt-3 text-xs text-gray-600">{CONCEPT_NOTICE}</figcaption>
            </figure>
          </div>
        ) : (
          points
        )}
      </Section>
    )
  }
  return (
    <Section id={id} tone={tone} space="tight">
      <SectionHeading eyebrow="The technology" title={title} />
      <SloganRow />
    </Section>
  )
}

/**
 * The three points as slogans, revealed in turn the first time the row scrolls
 * into view: each rises and fades in, then a short accent rule draws under it.
 *
 * The slogans start hidden and wait for the observer, so every way of not
 * scrolling to them has to be covered: `useInView` starts true where there is
 * no observer, print forces them visible, and for visitors who ask for reduced
 * motion the stagger is dropped here and index.css collapses the transitions.
 */
function SloganRow() {
  const { ref, inView } = useInView<HTMLUListElement>()
  // The stagger is a custom property rather than an inline transition-delay,
  // so the reduced-motion class can override it.
  const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties
  const timing =
    'transition-all duration-700 ease-out [transition-delay:var(--reveal-delay)] motion-reduce:[transition-delay:0ms]'
  return (
    <ul ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
      {PILLARS.map(({ id: key, Icon, eyebrow, slogan, line }, i) => (
        <li
          key={key}
          style={delay(i * 140)}
          className={`${timing} print:opacity-100 print:translate-y-0 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-green-700">{eyebrow}</p>
          <h3 className="mt-1 text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-gray-900 text-balance">
            {slogan}
          </h3>
          <span
            aria-hidden="true"
            style={delay(i * 140 + 350)}
            className={`mt-4 block h-1 rounded-full bg-cyan-400 ${timing} print:w-14 ${
              inView ? 'w-14' : 'w-0'
            }`}
          />
          <p className="mt-4 text-gray-600">{line}</p>
        </li>
      ))}
    </ul>
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
