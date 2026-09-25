import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import Container from './Container'
import LearnMoreModal from './LearnMoreModal'

interface NavItem {
  to: string
  label: string
  hint: string
}

/** Team and Contact sit under About rather than competing with it top-level. */
const ABOUT_GROUP: NavItem[] = [
  { to: '/about', label: 'About HYDRGEL', hint: 'Mission, origin and company facts' },
  { to: '/team', label: 'Team', hint: 'Founders and NTU inventors' },
  { to: '/contact', label: 'Contact', hint: 'Deploy, invest or partner' },
]

/** The one home-page section still reachable from the nav. */
const SOLUTION = { id: 'solution', label: 'Solution' }

/**
 * The new version of the site lives under /new while it is reviewed. Inside
 * it, Home points at /new and a Markets menu holding the three audience pages
 * replaces "Solution", which only exists on the current home page.
 */
const NEW_HOME = '/new'
const MARKETS_GROUP: NavItem[] = [
  { to: '/new/consumer', label: 'Consumer', hint: 'Travel, outdoors and home kits' },
  { to: '/new/corporate', label: 'Corporate', hint: 'Co-branded pouches for brands' },
  { to: '/new/humanitarian', label: 'Humanitarian', hint: 'Relief, conflict and off-grid teams' },
]

const linkBase = 'text-sm transition-colors'
const linkIdle = 'text-gray-600 hover:text-gray-900'
const linkActive = 'text-blue-600 font-semibold'

/**
 * A desktop dropdown. Disclosure rather than a hover-only menu, so it works by
 * keyboard and on touch as well as with a pointer.
 */
function NavDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const isActive = items.some((i) => i.to === pathname)

  // Any route change closes the dropdown.
  useEffect(() => setOpen(false), [pathname])

  // Dismiss on outside pointer or Escape.
  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      /*
        Only let the pointer close this if the keyboard is not currently
        inside it — otherwise an incidental mouse movement yanks the menu away
        from someone tabbing through it.
      */
      onMouseLeave={() => {
        if (!ref.current?.contains(document.activeElement)) setOpen(false)
      }}
      /*
        Close when keyboard focus leaves the menu. With two dropdowns, tabbing
        from one trigger to the other fires no pointer event, so without this
        both stayed open and Escape returned focus to the wrong trigger.
      */
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`${linkBase} inline-flex items-center gap-1 ${isActive ? linkActive : linkIdle}`}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-2 w-64">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 overflow-hidden">
            {items.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive: active }) =>
                  `block px-4 py-2.5 hover:bg-gray-50 transition-colors ${active ? 'bg-blue-50' : ''}`
                }
              >
                <span
                  className={`block text-sm font-medium ${
                    pathname === i.to ? 'text-blue-600' : 'text-gray-900'
                  }`}
                >
                  {i.label}
                </span>
                {/* gray-600, not gray-500: on the active item's blue-50 tint
                    gray-500 falls to 4.44:1. */}
                <span className="block text-xs text-gray-600 mt-0.5">{i.hint}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** A mobile-drawer group, expanded inline — a nested collapse would just add a tap. */
function MobileGroup({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <>
      <p className="pt-3 pb-1 text-xs uppercase tracking-wider text-gray-500 font-semibold">
        {label}
      </p>
      {items.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          className={({ isActive }) =>
            `py-2.5 pl-3 border-l-2 ${
              isActive
                ? 'text-blue-600 font-semibold border-blue-600'
                : 'text-gray-600 border-gray-200'
            }`
          }
        >
          {i.label}
        </NavLink>
      ))}
    </>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [learnMore, setLearnMore] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isNew = pathname === NEW_HOME || pathname.startsWith(`${NEW_HOME}/`)
  const home = isNew ? NEW_HOME : '/'

  // Any route change closes the drawer.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-gray-200 z-50">
        <Container>
          <div className="flex justify-between items-center h-16 gap-4">
            <Link to={home} className="flex items-center flex-shrink-0" aria-label="HYDRGEL home">
              <img
                src="/images/logo.png"
                alt="HYDRGEL"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-5">
              <NavLink
                to={home}
                end
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                Home
              </NavLink>

              {isNew && <NavDropdown label="Markets" items={MARKETS_GROUP} />}

              <NavDropdown label="About" items={ABOUT_GROUP} />

              <NavLink
                to="/news"
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                News
              </NavLink>

              {!isNew && (
                <button onClick={goToSolution} className={`${linkBase} ${linkIdle}`}>
                  {SOLUTION.label}
                </button>
              )}

              <NavLink
                to="/investors"
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                Investors
              </NavLink>

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
              <div className="flex flex-col">
                <NavLink
                  to={home}
                  end
                  className={({ isActive }) =>
                    `py-2.5 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`
                  }
                >
                  Home
                </NavLink>

                {isNew && <MobileGroup label="Markets" items={MARKETS_GROUP} />}

                <MobileGroup label="About" items={ABOUT_GROUP} />

                <NavLink
                  to="/news"
                  className={({ isActive }) =>
                    `py-2.5 mt-2 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`
                  }
                >
                  News
                </NavLink>

                {!isNew && (
                  <button onClick={goToSolution} className="text-left py-2.5 text-gray-600">
                    {SOLUTION.label}
                  </button>
                )}

                <NavLink
                  to="/investors"
                  className={({ isActive }) =>
                    `py-2.5 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`
                  }
                >
                  Investors
                </NavLink>

                <button
                  onClick={() => {
                    setOpen(false)
                    setLearnMore(true)
                  }}
                  className="mt-3 font-display font-medium bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
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
