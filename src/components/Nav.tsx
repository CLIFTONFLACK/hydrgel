import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

/** Home-page sections reachable by scroll; everything else is a real route. */
const SECTIONS = [
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'solution', label: 'Solution' },
  { id: 'contact', label: 'Contact Us' },
]

const ROUTES = [
  { to: '/news', label: 'News' },
  { to: '/investors', label: 'Investors' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === '/'

  /**
   * The original site rendered these as bare <button>s with nothing bound, so
   * none of them worked. Scroll when we are already on the home page,
   * otherwise route home and let the browser resolve the hash.
   */
  const goToSection = (id: string) => {
    setOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
      // The home route mounts after navigate resolves; wait a frame for the node.
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      )
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center cursor-pointer" aria-label="HYDRGEL home">
            <img src="/images/logo.png" alt="HYDRGEL" width={120} height={32} className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="text-gray-600 hover:text-gray-900"
              >
                {s.label}
              </button>
            ))}
            {ROUTES.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {r.label}
              </NavLink>
            ))}
            <Link
              to="/investors"
              className="font-display font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Investor brief
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
              >
                {s.label}
              </button>
            ))}
            {ROUTES.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {r.label}
              </NavLink>
            ))}
            <Link
              to="/investors"
              onClick={() => setOpen(false)}
              className="mt-2 block text-center font-display font-medium bg-blue-600 text-white px-4 py-2.5 rounded-md hover:bg-blue-700 transition-colors"
            >
              Investor brief
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
