import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import NewHome from './pages/new/Home'
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
 * Hash links still win, so the home page's #solution anchor keeps working.
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

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* New version under review: three-audience home and its pages. */}
        <Route path="/new" element={<NewHome />} />
        <Route path="/new/consumer" element={<Consumer />} />
        <Route path="/new/corporate" element={<Corporate />} />
        <Route path="/new/humanitarian" element={<Humanitarian />} />
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
