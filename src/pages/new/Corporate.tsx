import { Presentation, Leaf, Briefcase, HardHat } from 'lucide-react'
import Section, { SectionHeading } from '../../components/Section'
import {
  ConceptNote,
  FocusCta,
  FocusHero,
  ImageGrid,
  Pillars,
  PrimaryLink,
  SecondaryLink,
} from '../../components/Focus'
import { AIRLINES, CO_BRANDED, CUSTOM_SHAPES } from '../../data/focus'
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
        image="/images/focus/corporate-expo.webp"
        alt="Concept: branded HYDRGEL pouches handed out at a technology expo stand"
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
        <ImageGrid items={CO_BRANDED} />
        <ConceptNote />
      </Section>

      <Section tone="sunken">
        <SectionHeading
          eyebrow="Custom shapes"
          title="Or make the pouch your shape"
          lede="A flexible pouch does not have to be a rectangle. It can take the outline of a logo or a product."
        />
        <ImageGrid items={CUSTOM_SHAPES} />
        <ConceptNote />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Airlines and travel retail"
          title="In your livery, on board and in store"
          lede="An amenity-kit item, an in-flight shop product or a duty-free line, finished in the airline’s own livery."
        />
        <ImageGrid items={AIRLINES} />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src="/images/focus/consumer-inflight.webp"
            alt="Concept: an in-flight shop magazine with a HYDRGEL pouch on the cover"
            width={800}
            height={447}
            loading="lazy"
            className="w-full rounded-2xl"
          />
          <img
            src="/images/focus/corporate-congress.webp"
            alt="Concept: co-branded HYDRGEL pouches at a medical congress stand"
            width={1600}
            height={893}
            loading="lazy"
            className="w-full rounded-2xl"
          />
        </div>
        <ConceptNote />
      </Section>

      <Pillars title="Why partner with HYDRGEL" />

      <FocusCta
        title="Put your name on clean water"
        body="Tell us about the event, route or team you have in mind. We will come back with formats, timelines and minimum runs."
        cta="Discuss a partnership"
      />
    </main>
  )
}
