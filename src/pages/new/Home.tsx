import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Circle, Mail } from 'lucide-react'
import Section, { SectionHeading } from '../../components/Section'
import {
  ConceptNote,
  EfficacyTable,
  HowItWorks,
  Pillars,
  PilotGrid,
  ProofStrip,
} from '../../components/Focus'
import RevealHero from '../../components/RevealHero'
import { FOCUSES } from '../../data/focus'
import { MILESTONES } from '../../data/investor'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

/*
  One message and three doors: consumer, corporate and humanitarian. The
  disaster stats, video and HYDRLAB copy live on /humanitarian, where the
  reader who needs them lands.

  Below the doors the page makes the investment case in the order an investor
  checks it: what is protected, what is proven, who is piloting, where the
  company is. Raise terms stay off the page; they are in the deck, on request.
*/
export default function Home() {
  useDocumentMeta(
    'HYDRGEL - Patented water purification pouch | Consumer, corporate, humanitarian',
    'HYDRGEL is a patented, reusable water purification pouch. Fill, wait 3 minutes, drink. For travellers, for brands and for humanitarian relief.',
    '/',
  )
  return (
    <main id="main">
      <RevealHero />

      <ProofStrip />

      <Section id="focus" tone="sunken">
        <SectionHeading eyebrow="Our focus" title="Who HYDRGEL is for" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FOCUSES.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-blue-300 transition-shadow duration-200"
            >
              <div className="relative">
                <img
                  src={f.image}
                  alt={f.alt}
                  loading="lazy"
                  className="w-full aspect-[16/10] object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-2.5 py-1 text-xs font-medium text-white">
                  Concept image
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">{f.label}</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-gray-600 flex-1">{f.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-display font-medium text-blue-600 group-hover:text-blue-700">
                  Explore {f.label.toLowerCase()}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {/* The corporate door shows another company's brand. */}
        <ConceptNote brands />
      </Section>

      <Pillars tone="white" />

      <HowItWorks tone="sunken" />

      <Section id="evidence">
        <SectionHeading
          eyebrow="The evidence"
          title="What the lab results show"
          lede="We publish only what has been tested. Today that is bacteria. Other contaminants are development targets, and are described that way."
        />
        <EfficacyTable />
      </Section>

      <Section id="pilots" tone="sunken">
        <SectionHeading
          eyebrow="Pilot programme"
          title="Four sectors, four proving grounds"
          lede="These organisations have expressed intent to pilot. They are described by sector and region because none has yet approved public attribution."
        />
        <PilotGrid />
      </Section>

      <section id="investors" className="bg-slate-950 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">For investors</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-balance">
              A protected platform, entering its pilot phase
            </h2>
            <p className="mt-5 text-lg text-slate-200 leading-relaxed max-w-measure">
              The patent is granted and the worldwide licence is exclusive. Laboratory proof of
              concept is complete for bacteria. The pilot programme is the step that turns that into
              field data and first customers.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed max-w-measure">
              The investor brief covers the market, the technology, the intellectual property, the
              cost position and the team. The full deck is shared on request.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/investors"
                className="inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-slate-950 px-7 py-3 rounded-md hover:bg-cyan-100 transition-colors"
              >
                See the investor brief
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center justify-center font-display font-medium border border-white/40 text-white px-7 py-3 rounded-md hover:bg-white/10 transition-colors"
              >
                Meet the team
              </Link>
            </div>
          </div>

          <ol className="relative border-l-2 border-white/15 ml-3 space-y-7">
            {MILESTONES.map((m) => (
              <li key={m.title} className="ml-8">
                <span className="absolute -left-[13px] flex items-center justify-center bg-slate-950 rounded-full">
                  {m.done ? (
                    <CheckCircle className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                  ) : (
                    <Circle className="h-6 w-6 text-slate-500" aria-hidden="true" />
                  )}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  {m.date}
                  <span className="sr-only">{m.done ? ' (complete)' : ' (planned)'}</span>
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">{m.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="bg-blue-600 text-white py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            HYDRGEL is on a mission to end the world's thirst. We invite you to join us.
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/investors#request-deck"
              className="inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Request the investor deck
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 font-display font-semibold border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Talk to the team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
