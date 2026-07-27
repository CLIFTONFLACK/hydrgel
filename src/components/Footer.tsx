import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'

const SOCIALS = [
  { href: 'https://www.facebook.com/profile.php?id=61561245953864', label: 'Facebook', Icon: Facebook, hover: 'hover:text-blue-600' },
  { href: 'https://x.com/hydrgel', label: 'X', Icon: Twitter, hover: 'hover:text-gray-900' },
  { href: 'https://www.linkedin.com/company/hydrgel', label: 'LinkedIn', Icon: Linkedin, hover: 'hover:text-blue-700' },
  { href: 'https://youtube.com/@HYDRGEL', label: 'YouTube', Icon: Youtube, hover: 'hover:text-red-600' },
]

export default function Footer() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const goToSection = (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      )
    }
  }

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center cursor-pointer" aria-label="HYDRGEL home">
              <img src="/images/logo.png" alt="HYDRGEL" width={120} height={32} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Our products are designed to provide safe clean drinking water in various settings,
              from individual adventure activities to emergency situations requiring rapid access
              to safe water.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button onClick={() => goToSection('use-cases')} className="text-gray-600 hover:text-gray-900">
                  Use Cases
                </button>
              </li>
              <li>
                <button onClick={() => goToSection('solution')} className="text-gray-600 hover:text-gray-900">
                  Solution
                </button>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-gray-900">News</Link>
              </li>
              <li>
                <Link to="/investors" className="text-gray-600 hover:text-gray-900">Investors</Link>
              </li>
              <li>
                <button onClick={() => goToSection('contact')} className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Social Media</h3>
            <div className="mt-4 flex space-x-4">
              {SOCIALS.map(({ href, label, Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`text-gray-500 ${hover} transition-colors`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                <a href="tel:+445747348570" className="hover:text-gray-900">+44 (0)574.734 8570</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@hydrgel.com" className="hover:text-gray-900">INFO@HYDRGEL.COM</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" />
                <span>21 Science Park Rd, #01-8,<br />Singapore 117628</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Copyright {new Date().getFullYear()} HYDRGEL PTE. LTD. All rights reserved
            </p>
            <p className="text-sm text-gray-500">
              Built with{' '}
              <span className="text-red-600" aria-hidden="true">
                &hearts;
              </span>
              <span className="sr-only">love</span> by{' '}
              <a
                href="https://neonpixeldesigns.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Neon Pixel Designs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
