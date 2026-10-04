import { useEffect } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/new/Home'
import Consumer from './pages/new/Consumer'
import Corporate from './pages/new/Corporate'
import Humanitarian from './pages/new/Humanitarian'
import News from './pages/News'
import Investors from './pages/Investors'
import About from './pages/About'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/**
 * Keeps the site opening at the top.
 *
 * Route changes were already handled, but browsers default to
 * `scrollRestoration = 'auto'`, which restores the previous offset on reload
 * and back-navigation — so refreshing halfway down /news reopened it halfway
 * down. Switching to 'manual' hands that decision to us.
 *
 * Hash links still win, so links such as /#why-hydrgel and
 * /investors#request-deck land on their section.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

/** Redirects an old /new path, keeping the query string and the section hash. */
function LegacyRedirect({ to }: { to: string }) {
  const { search, hash } = useLocation()
  return <Navigate to={{ pathname: to, search, hash }} replace />
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/humanitarian" element={<Humanitarian />} />
        {/* The site was reviewed under /new before it became the root. Links
            shared during that review still work. vercel.json redirects these
            first; the routes cover in-app navigation. */}
        <Route path="/new" element={<LegacyRedirect to="/" />} />
        <Route path="/new/consumer" element={<LegacyRedirect to="/consumer" />} />
        <Route path="/new/corporate" element={<LegacyRedirect to="/corporate" />} />
        <Route path="/new/humanitarian" element={<LegacyRedirect to="/humanitarian" />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/news" element={<News />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
