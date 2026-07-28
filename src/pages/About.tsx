import { Link } from 'react-router-dom'
import { Droplets, Container as ContainerIcon, ArrowRight, CheckCircle } from 'lucide-react'
import Section, { SectionHeading } from '../components/Section'
import Container from '../components/Container'
import ProcessDiagram from '../components/ProcessDiagram'
import WaveDivider from '../components/WaveDivider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { CORPORATE } from '../data/investor'

const OFFERINGS = [
  {
    Icon: Droplets,
    phase: 'Phase one',
    title: 'HYDRGEL pouches',
    body: 'A pre-manufactured, lightweight pouch using cryogel technology to purify water in about three minutes. Reusable up to 100 times, delivering roughly 50 litres of drinking water per person.',
  },
  {
    Icon: ContainerIcon,
    phase: 'Phase two',
    title: 'HYDRLAB',
    body: 'A container-based laboratory and production unit, rapidly deployed to disaster zones. HYDRLAB analyses local water threats and produces customised HYDRGEL pouches on site within hours.',
  },
]

const PRINCIPLES = [
  'Purification happens in the gel, not across a membrane — so the formulation adapts to local contamination rather than assuming a single threat.',
  'No power, no replacement filters, no maintenance. Nothing that a closed border or a failed grid can switch off.',
  'Ship grams, not litres. Moving purification to where people are beats moving water to them.',
]

export default function About() {
  useDocumentMeta(
    'About | HYDRGEL',
    'HYDRGEL is a Singapore water technology company addressing global water insecurity with a patented cryogel purification platform licensed from Nanyang Technological University.',
    '/about',
  )

  return (
    <>
      <main id="main" className="pt-16">
        <Section space="loose">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                About HYDRGEL
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mt-3 tracking-tight text-balance uppercase">
                Ending the world&rsquo;s thirst
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                HYDRGEL is at the forefront of addressing global water insecurity with pioneering
                cryogel technology. Our mission is to provide safe, drinkable water to the billions
                of people who face water challenges — in everyday life and in crisis.
              </p>
            </div>
            <div>
              <img
                src="/images/boy.jpg"
                alt="A child drinking from a HYDRGEL water purification pouch"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </Section>

        <Section tone="sunken">
          <SectionHeading
            eyebrow="Origin"
            title="Born from a university, built by operators"
            lede="HYDRGEL emerged from a collaboration between the Singapore Deep-Tech Alliance and Nanyang Technological University — a venture-build model that pairs breakthrough research with founders who have commercialised technology before."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                k: 'The science',
                v: 'A cryogel purification platform developed at NTU’s Nanyang Environment and Water Research Institute, protected by US patent 10,939,677 B2.',
              },
              {
                k: 'The licence',
                v: 'An exclusive worldwide licence signed with NTUitive in November 2024, giving HYDRGEL global commercial rights to the platform.',
              },
              {
                k: 'The company',
                v: 'Incorporated in Singapore in June 2024 to take the technology from proven laboratory result into the field.',
              },
            ].map((x) => (
              <div key={x.k} className="bg-white border rounded-2xl p-6">
                <h3 className="font-semibold text-green-700 mb-2">{x.k}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{x.v}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="What we do" title="Core offerings" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFERINGS.map(({ Icon, phase, title, body }) => (
              <div key={title} className="border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {phase}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="sunken">
          <SectionHeading eyebrow="How it works" title="A platform, not a filter" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-4">
                {PRINCIPLES.map((p) => (
                  <li key={p} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="ml-3 text-gray-700 leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ProcessDiagram />
          </div>
        </Section>

        <Section>
          <SectionHeading
            eyebrow="Where we are"
            title="Pilot programme"
            lede="We are launching our pilot programme with partners across humanitarian, defence, commercial and rural development operations."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              ['Design', 'Final product design and ergonomic prototyping.'],
              ['Validation', 'Reporting and validating in-field use with pilot partners.'],
              ['Conversion', 'Proof of concept converting pilot partners into customers.'],
            ].map(([k, v], i) => (
              <div key={k} className="border-l-2 border-blue-200 pl-5">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Outcome {i + 1}
                </p>
                <h3 className="text-lg font-semibold text-green-700 mt-1">{k}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="sunken">
          <SectionHeading eyebrow="Corporate" title="Company facts" />
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORPORATE.map((f) => (
              <div key={f.label} className="bg-white rounded-2xl p-6 border">
                <dt className="text-xs uppercase tracking-wider text-gray-500">{f.label}</dt>
                <dd className="mt-2 text-gray-900 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <section className="bg-blue-600 text-white py-16 md:py-20">
          <Container>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-balance">
                  Meet the people behind it
                </h2>
                <p className="mt-2 text-blue-50">
                  The founders, and the NTU scientists who invented the platform.
                </p>
              </div>
              <Link
                to="/team"
                className="inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-blue-600 px-7 py-3 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                See the team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <WaveDivider />
    </>
  )
}
