import { Plane, Mountain, House } from 'lucide-react'
import Section, { SectionHeading } from '../../components/Section'
import {
  ConceptNote,
  EfficacyTable,
  FocusCta,
  FocusHero,
  HowItWorks,
  ImageGrid,
  Pillars,
  PrimaryLink,
  SecondaryLink,
} from '../../components/Focus'
import { REGIONAL_EDITIONS } from '../../data/focus'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

const USES = [
  {
    Icon: Plane,
    title: 'Travel',
    body: 'Refill from a hotel or airport tap instead of buying bottled water at every stop.',
  },
  {
    Icon: Mountain,
    title: 'Outdoors',
    body: 'Hiking, camping and festivals. Clip it to a bag and treat water where you find it.',
  },
  {
    Icon: House,
    title: 'Home preparedness',
    body: 'A light, reusable pouch for the emergency kit, for when the supply is interrupted.',
  },
]

export default function Consumer() {
  useDocumentMeta(
    'Consumer | HYDRGEL personal water purification pouch',
    'A reusable HYDRGEL pouch for travel, the outdoors and home emergency kits. Fill, wait 3 minutes, drink. No power, no pump, no cartridge.',
    '/new/consumer',
  )
  return (
    <main id="main">
      <FocusHero
        eyebrow="Consumer"
        title="Clean water wherever you travel"
        lede="One reusable pouch replaces a trail of plastic bottles. Fill it from a tap or stream, wait 3 minutes, and drink. No power, no pump and no cartridge to replace."
        image="/images/focus/consumer-hero.webp"
        alt="Travellers in an airport carrying and drinking from HYDRGEL pouches"
      >
        <PrimaryLink to="/contact">Register interest</PrimaryLink>
        <SecondaryLink to="#how-it-works">How it works</SecondaryLink>
      </FocusHero>

      <Section tone="sunken">
        <SectionHeading eyebrow="Made for" title="Everyday water, anywhere" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USES.map(({ Icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6">
              <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <HowItWorks />

      <Pillars title="What makes the pouch different" />

      <Section>
        <SectionHeading
          eyebrow="Regional editions"
          title="One pouch, made local"
          lede="The same pouch in six regional designs. Because the formulation can be adapted, each edition can also be tuned to the water it is most likely to meet."
        />
        <ImageGrid items={REGIONAL_EDITIONS} cols={6} />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src="/images/focus/consumer-lineup.webp"
            alt="Concept: the regional HYDRGEL range lined up together"
            width={1600}
            height={893}
            loading="lazy"
            className="w-full rounded-2xl"
          />
          <img
            src="/images/focus/consumer-dutyfree.webp"
            alt="Concept: HYDRGEL pouches on a travel retail shelf"
            width={1600}
            height={893}
            loading="lazy"
            className="w-full rounded-2xl"
          />
        </div>
        <ConceptNote />
      </Section>

      <Section tone="sunken">
        <SectionHeading
          eyebrow="The evidence"
          title="What the lab results show"
          lede="We publish only what has been tested. Today that is bacteria."
        />
        <EfficacyTable />
      </Section>

      <FocusCta
        title="Be first to carry one"
        body="The consumer pouch is in development. Tell us where you would use it and we will let you know when it is available."
        cta="Register interest"
      />
    </main>
  )
}
