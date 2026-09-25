import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import WaveDivider from '../../components/WaveDivider'
import Section, { SectionHeading } from '../../components/Section'
import { HowItWorks, Pillars } from '../../components/Focus'
import RevealHero from '../../components/RevealHero'
import { FOCUSES } from '../../data/focus'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

/*
  Simplified to one message and three doors: consumer, corporate and
  humanitarian. The disaster stats, video and HYDRLAB copy that used to live
  here moved to /humanitarian, where the reader who needs them lands.
*/
export default function Home() {
  useDocumentMeta(
    'HYDRGEL - Patented water purification pouch | Consumer, corporate, humanitarian',
    'HYDRGEL is a patented, reusable water purification pouch. Fill, wait 3 minutes, drink. For travellers, for brands and for humanitarian relief.',
    '/new',
  )
  return (
    <>
      <main id="main">
        <RevealHero />

        <Section id="focus" tone="sunken">
          <SectionHeading eyebrow="Our focus" title="Who HYDRGEL is for" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOCUSES.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-blue-300 transition-shadow duration-200"
              >
                <img
                  src={f.image}
                  alt={f.alt}
                  loading="lazy"
                  className="w-full aspect-[16/10] object-cover"
                />
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
        </Section>

        <Pillars tone="white" />

        <HowItWorks tone="sunken" />

        <section id="contact" className="bg-blue-600 text-white py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              HYDRGEL is on a mission to end the world's thirst. We invite you to join us.
            </h2>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Talk to the team
              </Link>
              <Link
                to="/investors"
                className="inline-flex items-center justify-center gap-2 font-display font-semibold border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors"
              >
                See the investor brief
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <WaveDivider />
    </>
  )
}
