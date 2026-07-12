import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { siteService } from '../../services/services'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [logoUrl, setLogoUrl] = useState('/logo.png')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    siteService.get()
      .then(res => {
        if (res.data?.logoUrl) {
          setLogoUrl(res.data.logoUrl)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleLogout = () => { logout(); navigate('/') }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/courses', label: 'Courses' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/events', label: 'Events' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#FCFAF7]/95 shadow-md border-b border-[#EBE3D5]/55 backdrop-blur-md' : 'bg-[#FCFAF7]/80 backdrop-blur-sm'
    }`}>
      {/* Top gold accent line */}
      <div className="h-1 bg-gradient-to-r from-[#E0B3B7] via-[#D4B26F] to-[#704A87]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoUrl}
              alt="Kalakriti Art Studio"
              className="h-16 w-16 object-contain drop-shadow-md"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-white bg-[#704A87] shadow-sm'
                    : 'text-[#3E3431] hover:text-[#704A87] hover:bg-[#F2EAE0]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-[#704A87] hover:text-[#54316B] text-sm font-semibold transition-colors">
                  <LayoutDashboard size={16} />
                  <span>{user?.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1 text-[#8F8082] hover:text-[#E0B3B7] text-sm cursor-pointer transition-colors">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[#3E3431] hover:text-[#704A87] text-sm font-semibold transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-pink text-sm py-2 px-5 font-bold">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#704A87] hover:text-[#E0B3B7] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FCFAF7] border-t border-[#EBE3D5] px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive(link.to)
                  ? 'text-white bg-[#704A87]'
                  : 'text-[#3E3431] hover:text-[#704A87] hover:bg-[#F2EAE0]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#EBE3D5] flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 text-[#704A87] text-sm font-semibold">
                  <LayoutDashboard size={16} /> My Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-[#8F8082] text-sm text-left">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-3 text-[#3E3431] text-sm font-semibold">Login</Link>
                <Link to="/register" className="block px-4 py-3 bg-[#E0B3B7] text-[#3E3431] rounded-xl text-sm font-bold text-center">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
