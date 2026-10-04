import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Beaker,
  Droplets,
  Globe2,
  FileText,
  CheckCircle,
  Circle,
  Mail,
  ArrowRight,
} from 'lucide-react'
import { SectionHeading } from '../components/Section'
import { FocusHero, PrimaryLink, SecondaryLink } from '../components/Focus'
import CostChart from '../components/CostChart'
import ProcessDiagram from '../components/ProcessDiagram'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { EFFICACY, MILESTONES, PARTNERS, CORPORATE } from '../data/investor'

const DRIVERS = [
  {
    Icon: Droplets,
    bg: 'bg-blue-50',
    color: 'text-blue-500',
    title: 'Pollution',
    body: 'Industrial waste and environmental neglect are degrading source water faster than treatment capacity is being built.',
  },
  {
    Icon: Globe2,
    bg: 'bg-amber-50',
    color: 'text-amber-500',
    title: 'Climate',
    body: 'Natural disasters and shifting hydrology repeatedly take centralised supply offline, in wildly varied scenarios.',
  },
  {
    Icon: ShieldCheck,
    bg: 'bg-red-50',
    color: 'text-red-500',
    title: 'Conflict',
    body: 'Escalating global conflict, including intentional contamination of supply, leaves populations without safe water.',
  },
]

// Each fact restates the hero lede; none is a new claim.
const HERO_FACTS = [
  { value: 'Patented', label: 'Water purification platform' },
  { value: 'Exclusive licence', label: 'From Nanyang Technological University' },
  { value: 'No maintenance', label: 'No power and no filters' },
]

export default function Investors() {
  useDocumentMeta(
    'Investors | HYDRGEL',
    'A patented cryogel water purification platform, exclusively licensed from Nanyang Technological University and built for the point of need.',
    '/investors',
  )
  return (
    <>
      <main id="main">
        {/* ---------------------------------------------------------- hero */}
        <FocusHero
          tone="dark"
          compact
          eyebrow="Investor information"
          title="Ending the world's thirst"
          accent="thirst"
          lede="A patented, globally scalable water purification platform, licensed exclusively from Nanyang Technological University and built for the point of need — no power, no filters, no ongoing maintenance."
          image="/images/pack.jpg"
          alt="HYDRGEL personal water purification pouches packed in a box"
          facts={HERO_FACTS}
        >
          <PrimaryLink to="#request-deck" onDark>
            Request the investor deck
          </PrimaryLink>
          <SecondaryLink to="/news" onDark>
            Why now
          </SecondaryLink>
        </FocusHero>

        {/* ------------------------------------------------------ the need */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="The opportunity" title="A market defined by failure of supply" />
            <p className="text-lg text-gray-600 max-w-2xl mb-12 leading-relaxed">
              Water insecurity is among the world's fastest-accelerating humanitarian and economic
              threats. Some 2.1 billion people lack safely managed drinking water (WHO/UNICEF, 2025), and
              disasters, pollution and climate stress continue to multiply. Existing solutions
              cannot adapt to what is actually in the water in front of them.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DRIVERS.map(({ Icon, bg, color, title, body }) => (
                <div key={title} className={`${bg} p-6 rounded-2xl`}>
                  <Icon className={`h-6 w-6 ${color} mb-4`} />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- technology */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="The technology" title="A cryogel platform, not a filter" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-700 mb-6">
                  HYDRGEL uses a hydrogel and silver-based cryogel medium in a lightweight, reusable
                  pouch. Because purification happens in the molecular structure of the gel rather
                  than through a physical membrane, the formulation can be tuned to the contaminant
                  profile of a specific location.
                </p>
                <ul className="space-y-3 text-gray-700">
                  {[
                    '330 ml treated in approximately 3 minutes',
                    'Designed for repeated use; the reuse figure is being validated in the pilot',
                    'No power, no replacement filters, no maintenance',
                    'Formulation can be tuned to local water, subject to testing',
                  ].map((point) => (
                    <li key={point} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="ml-3">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ProcessDiagram />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- proof */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Proof"
              title="Laboratory proof of concept: bacteria"
              lede="Bacteria is what has been tested so far. Other contaminants are development targets, subject to testing."
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] bg-white rounded-2xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="px-6 py-4 font-semibold">Test</th>
                    <th className="px-6 py-4 font-semibold">Before</th>
                    <th className="px-6 py-4 font-semibold">After</th>
                  </tr>
                </thead>
                <tbody>
                  {EFFICACY.map((row, i) => (
                    <tr key={row.test} className={i % 2 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 font-medium text-gray-900">{row.test}</td>
                      <td className="px-6 py-4 text-gray-600">{row.before}</td>
                      <td className="px-6 py-4 text-green-700 font-semibold">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Source: laboratory test reports, October 2020. Proof of concept, not a certification
              against any drinking-water standard.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- IP */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Intellectual property" title="Patented and exclusively licensed" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-2xl p-8">
                <FileText className="h-6 w-6 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">US 10,939,677 B2</h3>
                <p className="text-gray-600 text-sm mb-4">Approved March 2021.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {['Cryogel materials', 'Preparation method', 'Application for disinfection'].map(
                    (c) => (
                      <li key={c} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                        {c}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div className="border rounded-2xl p-8">
                <Beaker className="h-6 w-6 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Exclusive worldwide licence
                </h3>
                <p className="text-gray-600 text-sm mb-4">Signed with NTUitive, November 2024.</p>
                <p className="text-sm text-gray-700">
                  HYDRGEL holds global commercial rights to the platform through NTUitive, the
                  innovation and enterprise company of Nanyang Technological University, Singapore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- positioning */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Positioning" title="Lower cost per litre than bottled water, and adaptable" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <CostChart />
              <div>
                <p className="text-gray-700 mb-4">
                  Bottled water is the most adaptable incumbent solution — it works regardless of
                  what is in the local source — but it is also the most expensive and the least
                  environmentally sustainable, and it requires moving enormous volumes of liquid to
                  where people are.
                </p>
                <p className="text-gray-700">
                  HYDRGEL is designed to match that adaptability by tuning the gel to local
                  conditions, while shipping grams instead of litres.
                </p>
                <p className="mt-6 text-sm text-gray-500">
                  Indicative comparison from HYDRGEL's company presentation, against bottled water
                  only and not against other purification products. The HYDRGEL figure is a
                  planning estimate and the bottled figure a typical single-serve retail price.
                  Neither is audited, and the unit economics are being established in the pilot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ partners */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Pilot programme" title="Four sectors, four proving grounds" />
            <p className="text-gray-600 max-w-3xl mb-12">
              The pilot delivers three outcomes that de-risk commercial launch: final design and
              ergonomic prototypes, field validation data from pilot partners, and conversion of
              those partners into paying customers. Partners below have expressed intent to
              participate and are described by sector and region.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARTNERS.map((p) => (
                <div key={p.sector} className="border rounded-2xl p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-green-700">{p.sector}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                      {p.geography}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- milestones */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Traction" title="Where we are" />
            <ol className="relative border-l-2 border-blue-200 ml-3 space-y-8">
              {MILESTONES.map((m) => (
                <li key={m.title} className="ml-8">
                  <span className="absolute -left-[13px] flex items-center justify-center bg-white rounded-full">
                    {m.done ? (
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    {m.date}
                  </p>
                  <h3 className="text-xl font-semibold text-green-700 mt-1">{m.title}</h3>
                  <p className="text-gray-600 mt-1">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Full biographies now live on /team; this is the pointer to them. */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Team" title="Operators and inventors" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <p className="text-lg text-gray-600 leading-relaxed">
                HYDRGEL pairs the NTU scientists who created the cryogel platform &mdash; Professor
                Hu Xiao and Dr. Liang Yen Nan &mdash; with founders who have taken technology from
                laboratory to market before. Full biographies, affiliations and the institutions
                behind the company are on the team page.
              </p>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 font-display font-semibold border border-blue-600 text-blue-600 px-7 py-3 rounded-md hover:bg-blue-50 transition-colors"
              >
                Meet the team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- corporate */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Corporate" title="Company facts" />
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORPORATE.map((f) => (
                <div key={f.label} className="bg-white rounded-2xl p-6 shadow-sm">
                  <dt className="text-xs uppercase tracking-wider text-gray-500">{f.label}</dt>
                  <dd className="mt-2 text-gray-900 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* -------------------------------------------------- request deck */}
        <section id="request-deck" className="bg-blue-600 text-white py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request the investor deck</h2>
            <p className="text-blue-50 mb-8">
              The full company presentation covers the current round, use of funds, grant status and
              commercial pathway. It is shared on request.
            </p>
            <a
              href="mailto:clifton@hydrgel.com?subject=HYDRGEL%20investor%20deck%20request&body=Name%3A%0AOrganisation%3A%0ARole%3A%0A%0AI%27d%20like%20to%20review%20the%20HYDRGEL%20investor%20materials."
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 font-semibold"
            >
              <Mail className="h-5 w-5" />
              Email the CEO
            </a>
            <p className="mt-8 text-sm text-blue-50">
              Clifton Flack, CEO —{' '}
              <a href="mailto:clifton@hydrgel.com" className="underline">
                clifton@hydrgel.com
              </a>
              <br />
              Ruzbeh Masani, CTO —{' '}
              <a href="mailto:ruzbeh@hydrgel.com" className="underline">
                ruzbeh@hydrgel.com
              </a>
            </p>
          </div>
        </section>

        {/* -------------------------------------------------- disclaimer */}
        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              This page is provided for information only. It does not constitute an offer to sell or
              a solicitation of an offer to buy any security, nor investment advice or a
              recommendation, in any jurisdiction. Forward-looking statements about pilots, partners
              and commercialisation reflect current intent and are subject to change. Technical
              figures are drawn from HYDRGEL's own materials and third-party test reports as cited.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
