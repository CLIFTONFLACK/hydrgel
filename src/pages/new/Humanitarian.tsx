import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Section, { SectionHeading } from '../../components/Section'
import {
  EfficacyTable,
  FocusCta,
  FocusHero,
  HowItWorks,
  Pillars,
  PilotGrid,
  PrimaryLink,
  SecondaryLink,
} from '../../components/Focus'
import { ILLUSTRATIVE_NOTICE } from '../../data/focus'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

/*
  The stats, responder points and HYDRLAB copy moved here from the home page
  when it was simplified to three audience doors.
*/
/*
  Every public figure here is worded as its source words it and is listed in
  SOURCES below. The earlier versions ("480k deaths", "-7% of GDP lost to poor
  water supply") matched no source: the 7% was a sanitation figure for the
  worst-hit countries, not a loss from water supply. Check the source before
  changing a number or its label.
*/
const STATS = [
  // Same figure as /investors.
  { value: '2.1bn', label: 'people without safely managed drinking water' },
  { value: '505k', label: 'diarrhoeal deaths a year from unsafe drinking water' },
  { value: 'Up to 6%', label: 'of GDP at risk by 2050 in the most water-stressed regions' },
  { value: '7×', label: 'cheaper per litre than bottled water, on our own modelling' },
]

const SOURCES = [
  {
    label: 'WHO/UNICEF Joint Monitoring Programme, 2025 (data for 2024)',
    href: 'https://www.unicef.org/press-releases/fast-facts-1-4-people-globally-still-lack-access-safe-drinking-water-who-unicef',
  },
  {
    label: 'WHO, Drinking-water fact sheet, 2023 (data for 2019)',
    href: 'https://www.who.int/news-room/fact-sheets/detail/drinking-water',
  },
  {
    label: 'World Bank, High and Dry, 2016',
    href: 'https://www.worldbank.org/en/topic/water/publication/high-and-dry-climate-change-water-and-the-economy',
  },
]

const RESPONDER_POINTS = [
  {
    title: 'Climate disasters',
    body: 'After floods, storms and droughts, large groups of people need drinkable water immediately.',
  },
  {
    title: 'Conflict zones',
    body: 'Where supply lines are cut, a pouch that treats local water removes the need to truck bottled water in.',
  },
  {
    title: 'Off-grid teams',
    body: 'Defence, mining and rural development teams working for days away from a safe supply.',
  },
]

export default function Humanitarian() {
  useDocumentMeta(
    'Humanitarian | HYDRGEL water at the point of need',
    'HYDRGEL pouches and the HYDRLAB mobile facility bring drinkable water to disaster relief, conflict zones and off-grid teams.',
    '/humanitarian',
  )
  return (
    <main id="main">
      <FocusHero
        eyebrow="Humanitarian"
        title="Drinkable water at the point of need"
        lede="Clean drinking water is a right, not a luxury. HYDRGEL pouches treat local water where people are, instead of shipping bottled water to them."
        image="/images/boy.jpg"
        alt="Illustration of a child holding a HYDRGEL water pouch"
        imageNote={ILLUSTRATIVE_NOTICE}
      >
        <PrimaryLink to="/contact">Enquire about deployment</PrimaryLink>
        <SecondaryLink to="#hydrlab">About HYDRLAB</SecondaryLink>
      </FocusHero>

      <Section tone="sunken" space="tight">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gray-900 tabular-nums">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-gray-600 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Sources:{' '}
          {SOURCES.map((s, i) => (
            <span key={s.href}>
              {i > 0 && '; '}
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                {s.label}
              </a>
            </span>
          ))}
          . The cost comparison is HYDRGEL’s own model, not an audited figure.{' '}
          <Link to="/news" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
            Follow the reporting in our newsroom
          </Link>
          .
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="First response" title="Where HYDRGEL is needed" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESPONDER_POINTS.map((p) => (
            <div key={p.title} className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-semibold text-green-700">{p.title}</h3>
                <p className="text-gray-600 mt-1">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="hydrlab" tone="sunken">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <img
            src="/images/manu.jpg"
            alt="HYDRLAB container-based analysis and production facility"
            loading="lazy"
            className="w-full rounded-2xl shadow-lg"
          />
          <div>
            <SectionHeading
              eyebrow="HYDRLAB"
              title="A lab and production line in a container"
              lede="HYDRLAB is a fully fitted, container-based laboratory and production facility. Deployed to a relief zone, it analyses the local water and produces HYDRGEL pouches with a formulation matched to it."
            />
            <p className="text-gray-600">
              This is where purification diversity matters most: the formulation is set by the water
              on the ground, not by what was shipped months earlier. HYDRLAB is the second phase of the
              roadmap, after the current pilot programme.
            </p>
          </div>
        </div>
      </Section>

      <HowItWorks />

      <Pillars compact />

      <Section>
        <SectionHeading
          eyebrow="Pilot programme"
          title="Who we are piloting with"
          lede="These organisations have expressed intent to pilot. They are described by sector and region because none has yet approved public attribution."
        />
        <PilotGrid />
        <div className="mt-12">
          <EfficacyTable />
        </div>
      </Section>

      <Section tone="sunken">
        <div className="relative w-full aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl shadow-lg"
            src="https://www.youtube.com/embed/tMlrEF1KXxU?si=OclrBgzWnjhz625X"
            title="HYDRGEL video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </Section>

      <FocusCta
        title="Bring clean water to the point of need"
        body="Tell us where you operate and how many people you serve. We will come back with what is realistic on the current timeline, including pilot availability."
        cta="Enquire about deployment"
      />
    </main>
  )
}
