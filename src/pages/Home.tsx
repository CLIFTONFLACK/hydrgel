import { Link } from 'react-router-dom'
import { CheckCircle, AlertCircle, Users, Shield } from 'lucide-react'
import WaveDivider from '../components/WaveDivider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const STATS = [
  { value: '-7%', label: 'Loss GDP from Poor Water Supply' },
  { value: '480k', label: 'Deaths a Year from unsafe water' },
  { value: '2.8Bn', label: 'Do Not Have Access to Clean Water' },
  { value: '$10m', label: 'Cost to provide clean water to communities' },
]

const RESPONDER_POINTS = [
  {
    title: 'Clean Water for Climate Disasters',
    body: 'In emergency relief scenarios, where following a crisis, large groups of people need immediate drinkable water.',
  },
  {
    title: 'Clean Water in Conflict Zones',
    body: 'The world is becoming a more dangerous place. Humanitarian supplies of safe drinking water are a reality',
  },
]

const REVOLUTION_CARDS = [
  {
    Icon: AlertCircle,
    iconColor: 'text-red-500',
    bg: 'bg-red-50',
    title: '$600bn Cost Of Disaster',
    body: 'Water related disasters continue to break annual records as climate change takes effect globally.',
  },
  {
    Icon: Users,
    iconColor: 'text-pink-500',
    bg: 'bg-pink-50',
    title: '2.8Bn Need Water Security',
    body: 'Global natural disasters put millions of children at risk of disease from contaminated drinking water.',
  },
  {
    Icon: Shield,
    iconColor: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'Unprecedented Conflicts',
    body: 'Unprecedented numbers of conflict have left millions searching for safe drinkable water just to survive.',
  },
]

export default function Home() {
  useDocumentMeta(
    'HYDRGEL - Clean Drinking Water Solutions | Water Purification Technology',
    'HYDRGEL provides innovative water purification solutions for disaster relief, humanitarian aid, and emergency situations. Our personal water purification pouches deliver safe, clean drinking water at the point of need.',
    '/',
  )
  return (
    <>
      <main className="pt-16">
        <section id="hero" className="relative bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
              <div className="order-2 md:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  <span className="text-blue-500">drinkable water at</span>
                  <br />
                  <span className="text-blue-500">the point of need</span>
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-green-500 mt-4">
                  clean drinking water
                  <br />
                  is a right, not a luxury
                </h2>
                <p className="mt-4 text-gray-600">
                  HYDRGEL Personal Water Purification Pouches give instant access to safe, clean and
                  tasteless water to those who need it most.
                </p>
              </div>
              <div className="relative order-1 md:order-2">
                <img
                  src="/images/boy.jpg"
                  alt="Child with Hydrgel water pouch"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <div id="use-cases">
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl text-center text-blue-500 mb-12">
                the world is suffering more than ever from water disasters
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900">{s.value}</div>
                    <div className="mt-2 text-sm text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/tMlrEF1KXxU?si=OclrBgzWnjhz625X"
                  title="YouTube video player"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          <section id="first-responder" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold text-blue-500 mb-6">
                    HYDRLAB is a first
                    <br />
                    responder solution
                  </h2>
                  <p className="text-gray-700 mb-8 text-lg">
                    Based upon a patent approved cryogel preparation process for personal water
                    purification pouches. The molecular structure allows us modify the formulation to
                    adapt to local and specific needs. No more transporting millions of gallons of
                    bottled water around the world!
                  </p>
                  <div className="space-y-4">
                    {RESPONDER_POINTS.map((p) => (
                      <div key={p.title} className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-semibold text-green-500">{p.title}</h3>
                          <p className="text-gray-600 mt-1">{p.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <img
                      src="/images/manu.jpg"
                      alt="HYDRLAB Facility"
                      loading="lazy"
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                  <p className="mt-4 text-gray-600">
                    HYDRLAB is our humanitarian solution. A fully fitted container based lab and
                    production facility. Deployed to disaster relief zones for immediate water
                    analysis and production of customized HYDRGEL pouches.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section id="solution" className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <img
                  src="/images/pack.jpg"
                  alt="HYDRGEL Water Purification Pouches"
                  loading="lazy"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-blue-500">
                  personal water
                  <br />
                  purification solution
                </h2>
                <p className="mt-4">
                  <span className="text-green-500 font-bold">HYDRGEL</span> is a one of a kind novel
                  nano-technology using a hydro gel and silver based medium, providing a lightweight
                  and reusable device.
                </p>
                <h3 className="text-lg font-bold text-green-500 mt-6 mb-2">HOW IT WORKS:</h3>
                <p className="mb-8">
                  Pour 330 ml (the size of a coke can) of dirty water into our patented pouch and
                  after only 3 minutes the silver based gel compounds do their magic, absorbing and
                  purifying the water.
                </p>
                <Link
                  to="/investors"
                  className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 text-lg font-medium"
                >
                  learn more
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <h2 className="text-4xl font-bold text-blue-500">
                HYDRGEL is at the forefront of a
                <br />
                water accessibility revolution.
              </h2>
              <p className="text-gray-600 self-center">
                Imagine a world where every 20 seconds a life is lost by something as basic a right
                as access to safe drinking water... both recreationally and crucially, in times of
                crisis.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVOLUTION_CARDS.map(({ Icon, iconColor, bg, title, body }) => (
                <div key={title} className={`${bg} p-6 rounded-2xl`}>
                  <div className="flex items-center mb-4">
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-green-500 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-blue-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              HYDRGEL is on a mission to end the world's thirst.
              <br />
              We invite you to join us.
            </h2>
            <Link
              to="/investors"
              className="inline-block mt-8 bg-white text-blue-500 px-8 py-3 rounded-md hover:bg-gray-100 font-semibold"
            >
              Learn More
            </Link>
          </div>
        </section>
      </main>

      <WaveDivider />
    </>
  )
}
