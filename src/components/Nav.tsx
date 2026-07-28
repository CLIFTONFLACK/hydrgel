import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Container from './Container'
import LearnMoreModal from './LearnMoreModal'

/** The one home-page section still reachable from the nav. */
const SOLUTION = { id: 'solution', label: 'Solution' }

const ROUTES = [
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/news', label: 'News' },
  { to: '/investors', label: 'Investors' },
  { to: '/contact', label: 'Contact' },
]

const linkBase = 'text-sm transition-colors'
const linkIdle = 'text-gray-600 hover:text-gray-900'
const linkActive = 'text-blue-600 font-semibold'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [learnMore, setLearnMore] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  const goToSolution = () => {
    setOpen(false)
    if (pathname === '/') {
      document.getElementById(SOLUTION.id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${SOLUTION.id}`)
      requestAnimationFrame(() =>
        document.getElementById(SOLUTION.id)?.scrollIntoView({ behavior: 'smooth' }),
      )
    }
  }

  return (
    <>
      {/* Keyboard users can jump the whole nav rather than tabbing through it. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-gray-200 z-50">
        <Container>
          <div className="flex justify-between items-center h-16 gap-4">
            <Link to="/" className="flex items-center flex-shrink-0" aria-label="HYDRGEL home">
              <img
                src="/images/logo.png"
                alt="HYDRGEL"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            {/* Six links plus a button needs the wider breakpoint to sit comfortably. */}
            <div className="hidden lg:flex items-center gap-5">
              <button onClick={goToSolution} className={`${linkBase} ${linkIdle}`}>
                {SOLUTION.label}
              </button>
              {ROUTES.map((r) => (
                <NavLink
                  key={r.to}
                  to={r.to}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? linkActive : linkIdle}`
                  }
                >
                  {r.label}
                </NavLink>
              ))}
              <button
                onClick={() => setLearnMore(true)}
                className="font-display font-medium text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Learn more
              </button>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>

        {open && (
          <div className="lg:hidden border-t bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Container className="py-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={goToSolution}
                  className="text-left py-2.5 text-gray-600 hover:text-gray-900"
                >
                  {SOLUTION.label}
                </button>
                {ROUTES.map((r) => (
                  <NavLink
                    key={r.to}
                    to={r.to}
                    className={({ isActive }) =>
                      `py-2.5 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`
                    }
                  >
                    {r.label}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    setOpen(false)
                    setLearnMore(true)
                  }}
                  className="mt-2 font-display font-medium bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Learn more
                </button>
              </div>
            </Container>
          </div>
        )}
      </nav>

      {learnMore && <LearnMoreModal onClose={() => setLearnMore(false)} />}
    </>
  )
}
