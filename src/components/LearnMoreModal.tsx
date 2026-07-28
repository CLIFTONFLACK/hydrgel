import { Link } from 'react-router-dom'
import { Droplets, Container as ContainerIcon, ArrowRight, Mail } from 'lucide-react'
import Modal from './Modal'

const OFFERINGS = [
  {
    Icon: Droplets,
    title: 'HYDRGEL pouches',
    body: 'A lightweight, reusable pouch that purifies 330 ml of contaminated water in about three minutes. No power, no replacement filters, no maintenance. Reusable up to 100 times.',
    image: '/images/pack.jpg',
    alt: 'HYDRGEL personal water purification pouches',
  },
  {
    Icon: ContainerIcon,
    title: 'HYDRLAB',
    body: 'A container-based mobile lab and production unit, deployed to disaster zones to analyse local water and produce pouches matched to what is actually in it.',
    image: '/images/manu.jpg',
    alt: 'HYDRLAB container-based mobile laboratory and production unit',
  },
]

const ROUTES = [
  { to: '/about', label: 'About HYDRGEL', hint: 'The company and the science' },
  { to: '/team', label: 'The team', hint: 'Founders and NTU inventors' },
  { to: '/investors', label: 'Investor brief', hint: 'Technology, IP and traction' },
]

export default function LearnMoreModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} labelledBy="learn-more-title" accent="from-blue-500 to-green-500">
      <div className="overflow-y-auto px-6 py-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
          Ending the world&rsquo;s thirst
        </p>
        <h2 id="learn-more-title" className="mt-2 text-2xl font-bold text-blue-500 pr-8 text-balance">
          Drinkable water at the point of need
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          HYDRGEL is a Singapore water technology company built on a cryogel purification platform
          licensed exclusively from Nanyang Technological University. Because purification happens
          in the molecular structure of the gel rather than across a membrane, the formulation can
          be tuned to the contaminants actually present in a given place.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OFFERINGS.map(({ Icon, title, body, image, alt }) => (
            <div key={title} className="bg-gray-50 rounded-xl overflow-hidden">
              <img src={image} alt={alt} loading="lazy" className="w-full h-28 object-cover" />
              <div className="p-5">
                <Icon className="h-5 w-5 text-blue-600 mb-3" />
                <h3 className="font-semibold text-green-700 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border rounded-xl divide-y">
          {ROUTES.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              onClick={onClose}
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
            >
              <span>
                <span className="block font-medium text-gray-900">{r.label}</span>
                <span className="block text-xs text-gray-500">{r.hint}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          onClick={onClose}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 font-display font-semibold bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Talk to the team
        </Link>
      </div>
    </Modal>
  )
}
