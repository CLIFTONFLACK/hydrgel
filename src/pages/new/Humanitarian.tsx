import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Section, { SectionHeading } from '../../components/Section'
import {
  EfficacyTable,
  FocusCta,
  FocusHero,
  HowItWorks,
  Pillars,
  PrimaryLink,
  SecondaryLink,
} from '../../components/Focus'
import { PARTNERS } from '../../data/investor'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

/*
  The stats, responder points and HYDRLAB copy moved here from the home page
  when it was simplified to three audience doors.
*/
const STATS = [
  { value: '2.8bn', label: 'without access to clean water' },
  { value: '480k', label: 'deaths a year from unsafe water' },
  { value: '-7%', label: 'of GDP lost to poor water supply' },
  { value: '7×', label: 'cheaper per litre than bottled water' },
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
    '/new/humanitarian',
  )
  return (
    <main id="main">
      <FocusHero
        eyebrow="Humanitarian"
        title="Drinkable water at the point of need"
        lede="Clean drinking water is a right, not a luxury. HYDRGEL pouches treat local water where people are, instead of shipping bottled water to them."
        image="/images/boy.jpg"
        alt="Child holding a HYDRGEL water pouch"
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
        <p className="mt-10 text-center text-sm text-gray-600">
          <Link to="/news" className="text-blue-600 hover:text-blue-700 underline underline-offset-4">
            Follow the reporting behind these numbers
          </Link>
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

      <Pillars />

      <Section>
        <SectionHeading
          eyebrow="Pilot programme"
          title="Who we are piloting with"
          lede="These organisations have expressed intent to pilot. They are described by sector and geography because none has yet approved public attribution."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNERS.map((p) => (
            <div key={p.sector} className="rounded-2xl border border-gray-200 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">{p.geography}</p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">{p.sector}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
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
