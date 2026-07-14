import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Heart, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteService } from '../../services/services'

export default function Footer() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    siteService.get().then(res => setSettings(res.data)).catch(() => {})
  }, [])

  return (
    <footer className="bg-[#EBE2D3] text-[#3E3431] relative overflow-hidden border-t border-[#DED4C3]">
      {/* Faint mandala pattern */}
      <div className="absolute inset-0 bg-mandala opacity-20 pointer-events-none" />

      <div className="h-1 bg-gradient-to-r from-[#E0B3B7] via-[#D4B26F] to-[#704A87]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={settings?.logoUrl || '/logo.png'} alt="Kalakriti" className="w-16 h-16 object-contain" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-[#D4B26F]/40" />
              <Heart size={12} className="text-[#D4B26F] fill-[#D4B26F]" />
              <div className="h-px flex-1 bg-[#D4B26F]/40" />
            </div>
            <p className="text-sm leading-relaxed text-[#5C504E] mb-5">
              {settings?.tagline || 'enjoy ur art — Where creativity blooms and every stroke tells a story.'}
            </p>
            <div className="flex gap-3">
              {/* Instagram */}
              <a href={settings?.instagramUrl || 'https://instagram.com/kalakriti.artstudio'} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                title="Instagram">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href={settings?.facebookUrl || 'https://facebook.com/KalakritiArtStudio'} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm bg-[#1877F2]"
                title="Facebook">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4B26F] font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/courses', label: 'Courses' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/events', label: 'Events & Workshops' },
                { to: '/testimonials', label: 'Testimonials' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[#5C504E] hover:text-[#704A87] transition-colors flex items-center gap-1.5">
                    <ChevronRight size={13} className="text-[#D4B26F]" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#D4B26F] font-bold mb-5 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3 text-sm text-[#5C504E]">
              {['Art Classes', 'Workshops', 'Hobby Classes', 'Custom Art', 'Art Events'].map(c => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0B3B7] inline-block shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#D4B26F] font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#704A87] mt-0.5 shrink-0" />
                <span className="text-[#5C504E]">
                  {settings?.address || '208-B, 54th Cross, Opp Sri Rama Mandira, Rajajinagar 4th Block, Bangalore-10'}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-[#704A87] shrink-0" />
                <a href={`tel:${settings?.phone || '+918197344421'}`} className="text-[#5C504E] hover:text-[#704A87] transition-colors">
                  {settings?.phone || '+91 81973 44421'}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-[#704A87] shrink-0" />
                <a href={`mailto:${settings?.email || 'kalakriti.artstudio@gmail.com'}`} className="text-[#5C504E] hover:text-[#704A87] transition-colors text-xs">
                  {settings?.email || 'kalakriti.artstudio@gmail.com'}
                </a>
              </li>
              <li className="mt-4 bg-[#3E3431]/5 rounded-xl p-3 text-center">
                <p className="text-[#D4B26F] font-bold text-xs uppercase tracking-wider mb-1">Studio Timings</p>
                <p className="text-[#3E3431] font-bold text-lg">10:00 AM – 9:00 PM</p>
                <p className="text-[#5C504E] text-xs">Monday to Sunday</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#DED4C3] py-5 bg-[#3E3431]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#8F8082]">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} Kalakriti Art Studio. Made with <Heart size={11} className="text-[#704A87] fill-[#704A87]" /> in Bangalore
          </p>
          <Link to="/admin/login" className="hover:text-[#D4B26F] transition-colors">Admin Portal</Link>
        </div>
      </div>
    </footer>
  )
}
