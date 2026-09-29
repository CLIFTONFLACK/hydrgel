import { Presentation, Leaf, Briefcase, HardHat } from 'lucide-react'
import Section, { SectionHeading } from '../../components/Section'
import {
  ConceptGrid,
  ConceptNote,
  FocusCta,
  FocusHero,
  Pillars,
  PrimaryLink,
  SecondaryLink,
} from '../../components/Focus'
import { CO_BRANDED, CUSTOM_SHAPES, TRAVEL_FORMATS } from '../../data/focus'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

const USES = [
  {
    Icon: Presentation,
    title: 'Events and congresses',
    body: 'A giveaway people keep. It is clipped to a bag and refilled long after the stand comes down.',
  },
  {
    Icon: Leaf,
    title: 'Sustainability',
    body: 'One reusable pouch in place of single-use bottles, at events, on board and in the office.',
  },
  {
    Icon: Briefcase,
    title: 'Staff travel',
    body: 'A travel kit item for employees on the road, in the brand colours of the company sending them.',
  },
  {
    Icon: HardHat,
    title: 'Field teams',
    body: 'Mining, energy and infrastructure crews working off-grid, away from reliable drinking water.',
  },
]

export default function Corporate() {
  useDocumentMeta(
    'Corporate | Co-branded HYDRGEL water pouches',
    'Co-branded and custom-shaped HYDRGEL water purification pouches for events, airlines, staff travel and field teams. Patented cryogel technology.',
    '/new/corporate',
  )
  return (
    <main id="main">
      <FocusHero
        eyebrow="Corporate"
        title="Your brand on clean water"
        lede="HYDRGEL pouches can carry your brand across the whole face, or be made in your shape. It is a reusable, patented product that people use every day, not a logo on a bottle they throw away."
        image="/images/focus/consumer-lineup.webp"
        alt="Concept: six HYDRGEL pouches, each printed across the whole face in a different colour"
      >
        <PrimaryLink to="/contact">Discuss a partnership</PrimaryLink>
        <SecondaryLink to="#co-branded">See the concepts</SecondaryLink>
      </FocusHero>

      <Section tone="sunken">
        <SectionHeading eyebrow="Where it works" title="Built for brands that move people" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USES.map(({ Icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6">
              <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="co-branded">
        <SectionHeading
          eyebrow="Co-branded packs"
          title="The whole pouch in your colours"
          lede="Your identity owns the face of the pack. HYDRGEL sits as a small lockup in the corner."
        />
        <ConceptGrid items={CO_BRANDED} />
        <ConceptNote />
      </Section>

      <Section tone="sunken">
        <SectionHeading
          eyebrow="Custom shapes"
          title="Or make the pouch your shape"
          lede="A flexible pouch does not have to be a rectangle. It can take the outline of a logo or a product."
        />
        <ConceptGrid items={CUSTOM_SHAPES} />
        <ConceptNote />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Airlines and travel retail"
          title="In your livery, on board and in store"
          lede="An amenity-kit item, an in-flight shop product or a duty-free line, finished in the airline’s own livery."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <img
            src="/images/focus/consumer-dutyfree.webp"
            alt="Concept: HYDRGEL pouches on a travel retail shelf"
            width={1600}
            height={893}
            loading="lazy"
            className="w-full rounded-2xl"
          />
          <ul className="space-y-6">
            {TRAVEL_FORMATS.map((f) => (
              <li key={f.title}>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-1 text-gray-600">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <ConceptNote />
      </Section>

      <Pillars compact title="Why partner with HYDRGEL" />

      <FocusCta
        title="Put your name on clean water"
        body="Tell us about the event, route or team you have in mind. We will come back with formats, timelines and minimum runs."
        cta="Discuss a partnership"
      />
    </main>
  )
}
