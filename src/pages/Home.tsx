import { Link } from 'react-router-dom'
import { CheckCircle, AlertCircle, Users, Shield, Mail, ArrowRight } from 'lucide-react'
import WaveDivider from '../components/WaveDivider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

/*
  The fourth stat used to read "$10m — Cost to provide clean water to
  communities", which states no comparable quantity and invites the question
  "to whom?". Replaced with the cost-per-litre comparison from HYDRGEL's own
  company presentation, which is specific, checkable and makes the commercial
  argument the other three do not.
*/
const STATS = [
  { value: '-7%', label: 'of GDP lost to poor water supply' },
  { value: '480k', label: 'deaths a year from unsafe water' },
  { value: '2.8bn', label: 'without access to clean water' },
  { value: '7×', label: 'cheaper per litre than bottled water' },
]

const RESPONDER_POINTS = [
  {
    title: 'Clean water for climate disasters',
    body: 'In emergency relief scenarios, where following a crisis, large groups of people need immediate drinkable water.',
  },
  {
    title: 'Clean water in conflict zones',
    body: 'The world is becoming a more dangerous place. Humanitarian supplies of safe drinking water are a reality',
  },
]

const REVOLUTION_CARDS = [
  {
    Icon: AlertCircle,
    iconColor: 'text-red-500',
    bg: 'bg-red-50',
    title: '$600bn cost of disaster',
    body: 'Water related disasters continue to break annual records as climate change takes effect globally.',
  },
  {
    Icon: Users,
    iconColor: 'text-pink-500',
    bg: 'bg-pink-50',
    title: '2.8bn need water security',
    body: 'Global natural disasters put millions of children at risk of disease from contaminated drinking water.',
  },
  {
    Icon: Shield,
    iconColor: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'Unprecedented conflicts',
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
      <main id="main" className="pt-16">
        {/* Hero gets more room than the sections below it — the page was a
            uniform py-16 throughout, which flattened its hierarchy. */}
        <section id="hero" className="relative bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center text-center md:text-left">
              <div className="order-2 md:order-1">
                {/*
                  Caps come from CSS, not from typing capitals into the string.
                  Screen readers spell out hard-coded all-caps letter by letter,
                  and it breaks copy-paste and search indexing; text-transform
                  renders identically while the underlying text stays readable.
                */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight uppercase">
                  <span className="text-blue-500">Drinkable water at</span>
                  <br />
                  <span className="text-blue-500">the point of need</span>
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-green-700 mt-5 leading-snug">
                  Clean drinking water
                  <br />
                  is a right, not a luxury
                </h2>
                <p className="mt-6 text-gray-600 md:max-w-measure mx-auto md:mx-0">
                  HYDRGEL Personal Water Purification Pouches give instant access to safe, clean and
                  tasteless water to those who need it most.
                </p>
                {/* The hero previously offered no action at all. */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="#solution"
                    className="inline-flex items-center justify-center gap-2 font-display font-medium bg-blue-600 text-white px-7 py-3 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    How it works
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center font-display font-medium border border-gray-300 text-gray-700 px-7 py-3 rounded-md hover:border-gray-400 hover:text-gray-900 transition-colors"
                  >
                    Talk to the team
                  </Link>
                </div>
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
              <h2 className="text-2xl md:text-3xl text-center text-blue-500 mb-12 text-balance">
                The world is suffering more than ever from water disasters
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-3xl md:text-4xl font-bold text-gray-900 tabular-nums">
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm text-gray-500 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
              {/*
                A credibility-led page should not present four bare numbers
                with nothing behind them. Rather than attach citations we have
                not verified, point at the newsroom, where every item carries
                its primary source.
              */}
              <p className="mt-10 text-center text-sm text-gray-500">
                <Link to="/news" className="text-blue-600 hover:text-blue-700 underline underline-offset-4">
                  Follow the reporting behind these numbers
                </Link>
              </p>
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
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6 tracking-tight">
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
                          <h3 className="text-xl font-semibold text-green-700">{p.title}</h3>
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
                <h2 className="text-3xl md:text-4xl font-bold text-blue-500 tracking-tight">
                  Personal water
                  <br />
                  purification solution
                </h2>
                <p className="mt-4">
                  <span className="text-green-700 font-bold">HYDRGEL</span> is a one of a kind novel
                  nano-technology using a hydro gel and silver based medium, providing a lightweight
                  and reusable device.
                </p>
                <h3 className="text-lg font-bold text-green-700 mt-6 mb-2">How it works</h3>
                <p className="mb-8">
                  Pour 330 ml (the size of a coke can) of dirty water into our patented pouch and
                  after only 3 minutes the silver based gel compounds do their magic, absorbing and
                  purifying the water.
                </p>
                {/* Was a second undifferentiated "learn more" pointing at the
                    investor page; the reader here is asking about the product. */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-display bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 text-lg font-medium transition-colors"
                >
                  Enquire about deployment
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <h2 className="text-4xl font-bold text-blue-500">
                HYDRGEL at the forefront of a
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
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*
          This section previously offered a single vague "Learn More" that
          routed to the investor page. Anyone arriving to actually deploy
          HYDRGEL — a relief agency, a defence buyer, a mine operator — had
          no way to make contact anywhere on the site. Split by intent.
        */}
        <section id="contact" className="bg-blue-600 text-white py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              HYDRGEL is on a mission to end the world's thirst.
              <br />
              We invite you to join us.
            </h2>
            <p className="mt-4 text-blue-50 max-w-xl mx-auto">
              Whether you need drinking water at the point of need or want to back the
              technology that delivers it, start here.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-blue-700 rounded-2xl p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">Deploy HYDRGEL</h3>
                <p className="text-sm text-blue-50 flex-1">
                  Humanitarian relief, defence, mining and rural development teams needing
                  safe drinking water in the field.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Talk to the team
                </Link>
              </div>

              <div className="bg-blue-700 rounded-2xl p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">Invest in HYDRGEL</h3>
                <p className="text-sm text-blue-50 flex-1">
                  The technology, the patent position, the pilot programme and the team
                  behind it.
                </p>
                <Link
                  to="/investors"
                  className="mt-6 inline-flex items-center justify-center gap-2 font-display font-semibold border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors"
                >
                  See the investor brief
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WaveDivider />
    </>
  )
}
