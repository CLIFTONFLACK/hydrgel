import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Section, { SectionHeading } from '../components/Section'
import Container from '../components/Container'
import Avatar from '../components/Avatar'
import WaveDivider from '../components/WaveDivider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { FOUNDERS, INVENTORS, INSTITUTIONS, type Person } from '../data/team'

function PersonCard({ person, tone }: { person: Person; tone: 'white' | 'sunken' }) {
  return (
    <article
      className={`${
        tone === 'white' ? 'bg-white border' : 'bg-white border'
      } rounded-2xl p-6 sm:p-8 flex flex-col`}
    >
      <div className="flex items-center gap-4">
        <Avatar name={person.name} src={person.photo} />
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-blue-500 leading-tight">{person.name}</h3>
          <p className="text-sm text-green-700 font-semibold mt-0.5">{person.role}</p>
          {person.affiliation && (
            <p className="text-xs text-gray-500 mt-0.5">{person.affiliation}</p>
          )}
        </div>
      </div>

      <ul className="mt-6 space-y-2.5 text-sm text-gray-600">
        {person.bullets.map((b) => (
          <li key={b} className="flex items-start">
            <span className="text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" aria-hidden="true">
              &bull;
            </span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      {person.profileUrl && (
        <a
          href={person.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 font-medium"
        >
          Profile
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  )
}

export default function Team() {
  useDocumentMeta(
    'Team | HYDRGEL',
    'The founders building HYDRGEL and the Nanyang Technological University scientists behind the cryogel purification platform.',
    '/team',
  )

  return (
    <>
      <main id="main" className="pt-16">
        <Section space="loose">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Team</p>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mt-3 tracking-tight text-balance uppercase">
            Operators and inventors
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
            HYDRGEL pairs the scientists who created the cryogel purification platform at Nanyang
            Technological University with founders who have taken technology from laboratory to
            market before.
          </p>
        </Section>

        <Section tone="sunken">
          <SectionHeading
            eyebrow="Leadership"
            title="Founding team"
            lede="Running the company through its pilot programme and into commercial launch."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FOUNDERS.map((p) => (
              <PersonCard key={p.name} person={p} tone="sunken" />
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading
            eyebrow="Science"
            title="The inventors"
            lede="HYDRGEL was born from a collaboration between the Singapore Deep-Tech Alliance and Nanyang Technological University. The underlying science is theirs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INVENTORS.map((p) => (
              <PersonCard key={p.name} person={p} tone="white" />
            ))}
          </div>
        </Section>

        {/*
          Typeset wordmarks rather than logo images: these are third-party
          trademarks and we hold no approved brand assets for them.
        */}
        <Section tone="sunken">
          <SectionHeading eyebrow="Institutions" title="Where HYDRGEL comes from" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INSTITUTIONS.map((i) => (
              <a
                key={i.short}
                href={i.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border rounded-2xl p-6 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display font-bold text-lg text-gray-900 tracking-tight">
                      {i.short}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{i.name}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{i.relationship}</p>
              </a>
            ))}
          </div>
        </Section>

        <section className="bg-blue-600 text-white py-16 md:py-20">
          <Container>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-balance">
                  Want to work with this team?
                </h2>
                <p className="mt-2 text-blue-50">
                  Deployment enquiries and investor conversations both start here.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-blue-600 px-7 py-3 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                Get in touch
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
