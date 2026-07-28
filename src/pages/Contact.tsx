import { useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import Section, { SectionHeading } from '../components/Section'
import WaveDivider from '../components/WaveDivider'
import ContactFormModal from '../components/ContactFormModal'
import { CONTACT_ROUTES, type ContactRoute } from '../data/contactRoutes'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const SOCIALS = [
  { href: 'https://www.linkedin.com/company/hydrgel', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://x.com/hydrgel', label: 'X', Icon: Twitter },
  { href: 'https://youtube.com/@HYDRGEL', label: 'YouTube', Icon: Youtube },
  { href: 'https://www.facebook.com/profile.php?id=61561245953864', label: 'Facebook', Icon: Facebook },
]

export default function Contact() {
  const [openRoute, setOpenRoute] = useState<ContactRoute | null>(null)

  useDocumentMeta(
    'Contact | HYDRGEL',
    'Talk to HYDRGEL about deploying water purification in the field, investing in the company, or technical and manufacturing partnerships.',
    '/contact',
  )

  return (
    <>
      <main id="main" className="pt-16">
        <Section space="loose">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mt-3 tracking-tight text-balance uppercase">
            Start the right conversation
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
            Pick the route that matches what you need. Each one asks for the details we would
            otherwise have to come back for, so the first reply can be a useful one.
          </p>
        </Section>

        <Section tone="sunken">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CONTACT_ROUTES.map((r) => (
              <div
                key={r.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col ${
                  r.primary ? 'bg-white border-2 border-blue-600' : 'bg-white border'
                }`}
              >
                {r.primary && (
                  <span className="self-start text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium mb-3">
                    Most enquiries
                  </span>
                )}
                <h2 className="text-xl font-bold text-blue-500">{r.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{r.who}</p>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed flex-1">{r.body}</p>
                <button
                  onClick={() => setOpenRoute(r)}
                  className={`mt-6 inline-flex items-center justify-center gap-2 font-display font-semibold px-6 py-3 rounded-md transition-colors ${
                    r.primary
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                  }`}
                >
                  {r.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
                {/* Direct address stays visible for anyone who would rather
                    use their own mail client than a form. */}
                <p className="mt-3 text-xs text-gray-500 text-center break-all">
                  or email{' '}
                  <a href={`mailto:${r.email}`} className="hover:text-blue-600 transition-colors">
                    {r.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionHeading eyebrow="Direct" title="Company details" />
              <ul className="space-y-5 text-gray-700">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-gray-500">
                      General
                    </span>
                    <a href="mailto:info@hydrgel.com" className="hover:text-blue-600 transition-colors">
                      info@hydrgel.com
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-gray-500">
                      Telephone
                    </span>
                    <a href="tel:+445747348570" className="hover:text-blue-600 transition-colors">
                      +44 (0)574.734 8570
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-gray-500">
                      Office
                    </span>
                    21 Science Park Rd, #01-8
                    <br />
                    Singapore 117628
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Follow</p>
                <div className="flex gap-3">
                  {SOCIALS.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="h-10 w-10 rounded-full border flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-blue-500">Registered entity</h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                HYDRGEL PTE. LTD. is a private company limited by shares, incorporated in Singapore
                on 20 June 2024 under UEN 202424887Z. Its registered activity is the collection,
                purification and distribution of water.
              </p>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Correspondence sent to the addresses above reaches the founding team directly. We
                answer deployment and partnership enquiries first.
              </p>
            </div>
          </div>
        </Section>
      </main>

      <WaveDivider />

      {openRoute && (
        <ContactFormModal route={openRoute} onClose={() => setOpenRoute(null)} />
      )}
    </>
  )
}
